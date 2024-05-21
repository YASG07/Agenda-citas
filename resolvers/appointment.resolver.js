const Appointment = require('../models/appointment');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const appointmentResolver = {
    Query: {
        allAppointments: async () => {
            try {
                const appointments = await Appointment.find();
                return appointments;
            } catch (error) {
                throw new Error("Failed to fetch appointments");
            }
        },
        oneAppointment: async (_, { id }) => {
            try {
                const appointment = await Appointment.findById(id);
                if (!appointment) {
                    throw new Error("Appointment not found");
                }
                return appointment;
            } catch (error) {
                throw new Error("Failed to fetch appointment");
            }
        }
    },
    Mutation: {
        addAppointment: async (_, { date, time, treatment, patient, price, address, doctor }) => {
            try {
                const newAppointment = new Appointment({
                    date,
                    time,
                    treatment,
                    patient,
                    price,
                    address,
                    doctor
                });
                await newAppointment.save();
                pubsub.publish('APPOINTMENT_CREATED', { appointmentCreated: newAppointment });
                return newAppointment;
            } catch (error) {
                throw new Error("Failed to add appointment");
            }
        },
        updateAppointment: async (_, { id, date, time, treatment, patient, price, address, doctor }) => {
            try {
                const appointment = await Appointment.findById(id);
                if (!appointment) {
                    throw new Error("Appointment not found");
                }
                appointment.date = date || appointment.date;
                appointment.time = time || appointment.time;
                appointment.treatment = treatment || appointment.treatment;
                appointment.patient = patient || appointment.patient;
                appointment.price = price || appointment.price;
                appointment.address = address || appointment.address;
                appointment.doctor = doctor || appointment.doctor;
                await appointment.save();
                return appointment;
            } catch (error) {
                throw new Error("Failed to update appointment");
            }
        },
        deleteAppointment: async (_, { id }) => {
            try {
                const appointment = await Appointment.findByIdAndDelete(id);
                if (!appointment) {
                    throw new Error("Appointment not found");
                }
                return appointment;
            } catch (error) {
                throw new Error("Failed to delete appointment");
            }
        }
    },
    Subscription: {
        appointmentCreated: {
            subscribe: () => pubsub.asyncIterator('APPOINTMENT_CREATED')
        }
    }
};

module.exports = {
    appointmentResolver
};
