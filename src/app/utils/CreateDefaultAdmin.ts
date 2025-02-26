import bcrypt from 'bcrypt';
import { Auth } from '../module/Auth/auth.model';
import { IAuth } from '../module/Auth/auth.interface';
import { config } from '../config';


export async function createAdminIfNotExists() {
    const adminExists = await Auth.findOne({ role: 'Admin' });

    if (!adminExists) {
        const adminData: IAuth = {
            name: 'Admin',
            email: 'admin@gmail.com',
            number: 1234567890,
            balance: 1000000,
            password: '12345',
            nid: '1234567890123',
            role: 'Admin',
            accountType: 'Admin',
            income:0,
        };


        
        await Auth.create(adminData);
      
    } 
}