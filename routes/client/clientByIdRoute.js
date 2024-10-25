import express from 'express';
import fs from 'fs';

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client data
 *       404:
 *         description: Client not found
 */

export const clientIdRouter = express.Router();

clientIdRouter.get("/clients/:id", (req, res) => {
    fs.readFile('data/client.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }

        const clients = JSON.parse(data);
        const client = clients.find(c => c.id == req.params.id);

        if (client) {
            res.json({
                ...client,
                links: {
                    getList: '/clients',
                    delete: `/clients/${client.id}`,
                    patch: `/clients/${client.id}`,
                    post: '/clients',
                    put: `/clients/${client.id}`
                }
            });
        } else {
            res.status(404).send('Client not found');
        }
    });
});