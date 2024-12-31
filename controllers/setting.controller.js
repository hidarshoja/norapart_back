import db from "../models/index.js";
import {Op,Sequelize } from "sequelize";
import {getLocalIPAddress} from "../libs/get-ip.js";
import moment from 'moment'

export const createViews = async(req,res)=>{
    try {
        const ipAddress = getLocalIPAddress()
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Check if the IP has already been saved today
        const existingEntry = await db.IpAddress.findOne({
            where: {
                ip_address: ipAddress,
                createdAt: {
                    [Op.between]: [todayStart, todayEnd],
                },
            },
        });

        if (existingEntry) {
            return res.status(400).json({ message: 'IP address has already been saved today.' });
        }

        // Save the new IP
        await db.IpAddress.create({ ip_address: ipAddress, createdAt: new Date() });
        res.status(201).json({ message: 'IP address saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the IP address.' });
    }
}

//! get count of view in ip address
export const getDailyIpCounts = async (req,res) => {
    try {

        const date30DaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'); // Start date
        const today = moment().format('YYYY-MM-DD 00:00:00');

        console.log('date30DaysAgo',date30DaysAgo)
        console.log('today',today)

        const results = await db.IpAddress.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'], // Format to date
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'], // Count records
            ],
            where: {
                createdAt: {
                    [Op.between]: [date30DaysAgo, today], // Between last 30 days
                },
            },
            group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))], // Group by date
            order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']], // Sort by date
            raw: true, // Return raw JSON results
        });

        // Map the database results into a dictionary for faster lookup
        const countsMap = results.reduce((acc, row) => {
            acc[row.date] = parseInt(row.count, 10);
            return acc;
        }, {});

        // Generate all dates from the past 30 days
        const formattedResults = [];
        for (let i = 0; i <= 30; i++) {
            const currentDate = moment(date30DaysAgo).add(i, 'days').format('YYYY-MM-DD');
            formattedResults.push({
                date: currentDate,
                count: countsMap[currentDate] || 0, // Use 0 if no count exists for the date
            });
        }

        return res.status(200).json({data:formattedResults,counts:results.length});
    } catch (error) {
        console.error('Error fetching daily IP counts:', error);
    }
};
