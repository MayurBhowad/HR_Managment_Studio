const app = require('./app.main');
const db = require('./db/db.main');

const PORT = process.env.PORT || 5000;

db.connect()
    .then(() => console.log('Database is UP and connected!'))

app.listen(PORT, () => console.log(`API is UP and Running...`));