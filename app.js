const fs = require('fs');
const d = 0;

let student = {
    name: 'Mike',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
};

let data = JSON.stringify(student);
fs.writeFileSync('test1.json', data);
