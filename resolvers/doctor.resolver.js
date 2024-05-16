const { doctorData } = require('../data/doctor.data');

const doctorResolver = {
    Query: {
        allDoctors: () => {
            return doctorData;
        },
        oneDoctor: (_, { id }) => {
            const doctor = doctorData.find(doctor => doctor.id === id);
            return doctor;
        },
        specialtyDoctors: (_, { specialty }) => {
            const doctors = doctorData.filter(doctor => doctor.specialty === specialty);
            return doctors;
        }
    },
    Mutation: {
        addDoctor: (_, { name, lastName, gender, phone, email, specialty, professionalID, office, atentionDays, atentionHours }) =>{
            const newDoctor = {
                id: doctorData.length + 1,
                name,
                lastName,
                gender,
                phone,
                email,
                specialty,
                professionalID,
                office,
                atentionDays,
                atentionHours
            };

            doctorData.push(newDoctor);

            return newDoctor;
        },
        updateDoctor: (_, { id, name, lastName, gender, phone, email, specialty, professionalID, office, atentionDays, atentionHours }) =>{
            const doctorIndex = doctorData.findIndex(doctor => doctor.id === id);

            const doctorUpdated = doctorData[doctorIndex];
            doctorUpdated.name = name || doctorUpdated.name;
            doctorUpdated.lastName = lastName || doctorUpdated.lastName;
            doctorUpdated.gender = gender || doctorUpdated.gender;
            doctorUpdated.phone = phone || doctorUpdated.phone;
            doctorUpdated.email = email || doctorUpdated.email;
            doctorUpdated.specialty = specialty || doctorUpdated.specialty;
            doctorUpdated.professionalID = professionalID || doctorUpdated.professionalID;
            doctorUpdated.office = office || doctorUpdated.office;
            doctorUpdated.atentionDays = atentionDays || doctorUpdated.atentionDays;
            doctorUpdated.atentionHours = atentionHours || doctorUpdated.atentionHours;

            return doctorUpdated;
        },
        deleteDoctor: (_, { id }) => {
            const doctorIndex = doctorData.findIndex(doctor => doctor.id === id);
            const doctor = doctorData[doctorIndex];
            doctorData.splice(doctorIndex, 1);
            return doctor;
        }
    }
};

module.exports = {
    doctorResolver
};