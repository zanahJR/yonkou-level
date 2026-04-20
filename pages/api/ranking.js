export default function handler(req, res) {
  res.status(200).json([
    { name: 'Luffy', points: 100 },
    { name: 'Zoro', points: 90 },
  ]);
}
