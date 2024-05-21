const Doctor = require('../models/doctor');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const doctorResolver = {
    Query: {
        allDoctors: async () => {
            try {
                const doctors = await Doctor.find();
                return doctors;
            } catch (error) {
                throw new Error("Failed to fetch doctors");
            }
        },
        oneDoctor: async (_, { id }) => {
            try {
                const doctor = await Doctor.findById(id);
                if (!doctor) {
                    throw new Error("Doctor not found");
                }
                return doctor;
            } catch (error) {
                throw new Error("Failed to fetch doctor");
            }
        },
        specialtyDoctors: async (_, { specialty }) => {
            try {
                const doctors = await Doctor.find({ specialty });
                return doctors;
            } catch (error) {
                throw new Error("Failed to fetch doctors by specialty");
            }
        }
    },
    Mutation: {
        addDoctor: async (_, { name, lastName, gender, phone, email, specialty, professionalID, office, atentionDays, atentionHours }) => {
            try {
                const newDoctor = new Doctor({
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
                });
                await newDoctor.save();
                pubsub.publish('DOCTOR_CREATED', { doctorCreated: newDoctor });
                return newDoctor;
            } catch (error) {
                throw new Error("Failed to add doctor");
            }
        },
        updateDoctor: async (_, { id, name, lastName, gender, phone, email, specialty, professionalID, office, atentionDays, atentionHours }) => {
            try {
                const doctor = await Doctor.findById(id);
                if (!doctor) {
                    throw new Error("Doctor not found");
                }
                doctor.name = name || doctor.name;
                doctor.lastName = lastName || doctor.lastName;
                doctor.gender = gender || doctor.gender;
                doctor.phone = phone || doctor.phone;
                doctor.email = email || doctor.email;
                doctor.specialty = specialty || doctor.specialty;
                doctor.professionalID = professionalID || doctor.professionalID;
                doctor.office = office || doctor.office;
                doctor.atentionDays = atentionDays || doctor.atentionDays;
                doctor.atentionHours = atentionHours || doctor.atentionHours;
                await doctor.save();
                return doctor;
            } catch (error) {
                throw new Error("Failed to update doctor");
            }
        },
        deleteDoctor: async (_, { id }) => {
            try {
                const doctor = await Doctor.findByIdAndDelete(id);
                if (!doctor) {
                    throw new Error("Doctor not found");
                }
                return doctor;
            } catch (error) {
                throw new Error("Failed to delete doctor");
            }
        }
    },
    Subscription: {
        doctorCreated: {
            subscribe: () => pubsub.asyncIterator('DOCTOR_CREATED')
        }
    }
};

module.exports = {
    doctorResolver
};
