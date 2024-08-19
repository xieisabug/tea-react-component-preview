// pages/api/saveFile.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { fileName, fileContent } = req.body;

        if (!fileName || !fileContent) {
            return res.status(400).json({ error: 'Missing fileName or fileContent' });
        }

        const filePath = path.join(process.cwd(), 'pages/components', fileName);

        try {
            fs.writeFileSync(filePath, fileContent, 'utf8');
            return res.status(200).json({ message: 'File saved successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to save file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}