const fs = require('fs');

const runMigration = async () => {
    const expectedResult = [];
    const realData = [];
    const finalResult = [];
    fs.createReadStream('./migrations/20210428105753-AddRoleUser.js')
        .on('data', (data) => expectedResult.push(data))
        .on('end', () => {
            let total = 0;
            let correct = 0;
            let failed = 0;
            expectedResult.map((expect) => {
                realData.map((real) => {
                    if (expect.id !== real.id) return;
                    finalResult.push(expect);
                    finalResult.push(real);
                    total++;
                    if (
                        expect.firstName === real.firstName &&
                        expect.email === real.email
                    ) {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'correct',
                            email: 'commit',
                        });
                        correct++;
                    } else {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'failed',
                            email: 'rollback',
                        });
                        failed++;
                    }
                });
            });
        });
    fs.createReadStream('./migrations/20210428112559-AddTableId.js')
        .on('data', (data) => expectedResult.push(data))
        .on('end', () => {
            let total = 0;
            let correct = 0;
            let failed = 0;
            expectedResult.map((expect) => {
                realData.map((real) => {
                    if (expect.id !== real.id) return;
                    finalResult.push(expect);
                    finalResult.push(real);
                    total++;
                    if (
                        expect.firstName === real.firstName &&
                        expect.email === real.email
                    ) {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'correct',
                            email: 'commit',
                        });
                        correct++;
                    } else {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'failed',
                            email: 'rollback',
                        });
                        failed++;
                    }
                });
            });
        });
}

module.exports = {
    runMigration,
}