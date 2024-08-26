import { Request, Response } from 'express';
import User from '../models/User.js';
import { AuthenticatedRequest } from '../types/custom.js';

export const matchUsersForMeal = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
        // Get available users
        const availableUsers = await User.find({ isAvailableForMeal: true });

        // Group users by faith
        const faithGroups = groupUsersByFaith(availableUsers);

        // Create matches
        const matches = [];
        while (faithGroups.size > 1) {
            const [faith1, users1] = faithGroups.entries().next().value;
            faithGroups.delete(faith1);
            const [faith2, users2] = faithGroups.entries().next().value;
            faithGroups.delete(faith2);

            while (users1.length > 0 && users2.length > 0) {
                const user1 = users1.pop();
                const user2 = users2.pop();
                matches.push([user1, user2]);
            }

            // Put any remaining users back
            if (users1.length > 0) faithGroups.set(faith1, users1);
            if (users2.length > 0) faithGroups.set(faith2, users2);
        }

        // Notify matched users (you'll need to implement this)
        for (const match of matches) {
            await notifyUsers(match);
        }

        return res.status(200).json({ matches });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

function groupUsersByFaith(users: any[]): Map<string, any[]> {
    const faithGroups = new Map();
    for (const user of users) {
        if (!faithGroups.has(user.faith)) {
            faithGroups.set(user.faith, []);
        }
        faithGroups.get(user.faith).push(user);
    }
    return faithGroups;
}

async function notifyUsers(match: any[]) {
    // Implement user notification logic here
    // This could involve sending emails, push notifications, or updating a user's matches in the database
}