import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AmoCRMService {
	private readonly apiUrl = process.env.AMO_API_URL;
	private readonly clientId = process.env.AMO_CLIENT_ID;
	private readonly clientSecret = process.env.AMO_CLIENT_SECRET;
	private readonly redirectUri = process.env.AMO_REDIRECT_URI;
	private readonly grantType = process.env.AMO_GRANT_TYPE;

	public async findOrCreateContact(name: string, email: string, phone: string): Promise<void> {
		const contact = await this.findContactByEmailOrPhone(email, phone);

		if (contact) {
			await this.updateContact(contact.id, name, email, phone);
		} else {
			const newContact = await this.createContact(name, email, phone);
			await this.createDeal(newContact.id);
		}
	}

	private async findContactByEmailOrPhone(email: string, phone: string): Promise<any> {
		try {
			// Реализация метода для поиска контакта по почте или телефону
			const apiKey = 'your_api_key'; // замените на ваш ключ API AmoCRM
			const subdomain = 'your_subdomain'; // замените на ваш поддомен AmoCRM

			const emailResponse = await axios.get(`https://${subdomain}.amocrm.ru/api/v4/contacts?filter[email]=${email}`, {
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			});

			if (emailResponse.data._embedded.contacts.length > 0) {
				return emailResponse.data._embedded.contacts[0];
			}

			const phoneResponse = await axios.get(`https://${subdomain}.amocrm.ru/api/v4/contacts?filter[phone]=${phone}`, {
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			});

			if (phoneResponse.data._embedded.contacts.length > 0) {
				return phoneResponse.data._embedded.contacts[0];
			}

			return null;
		} catch (error) {
			console.error('Error finding contact:', error);
			throw new Error('Error finding contact');
		}
	}

	private async updateContact(contactId: string, name: string, email: string, phone: string): Promise<void> {
		try {
			// Реализация метода для обновления контакта данными
			const response = await fetch(https://www.amocrm.com/api/v4/contacts/${contactId}, {
				method: 'PATCH',
				headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
				},
				body: JSON.stringify({
						name: name,
						custom_fields_values: [
								{
										field_id: 'email',
										values: [
												{
														value: email
												}
										]
								},
								{
										field_id: 'phone',
										values: [
												{
														value: phone
												}
										]
								}
						]
				})
			};
			if (response.ok) {
					console.log('Contact updated successfully');
			} else {
					console.error('Failed to update contact');
			}
		} catch (error) {
			console.error('Error updating contact:', error);
			throw new Error('Error updating contact');
	}
	

	private async createContact(name: string, email: string, phone: string): Promise<any> {
		// Реализация метода для создания нового контакта
		try {
			const response = await fetch(https://www.amocrm.com/api/v4/contacts, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
				},
				body: JSON.stringify({
						name: name,
						custom_fields_values: [
								{
										field_id: 'email',
										values: [
												{
														value: email
												}
										]
								},
								{
										field_id: 'phone',
										values: [
												{
														value: phone
												}
										]
								}
						]
				})
			);

			if (response.ok) {
				console.log('Contact created successfully');
			} else {
				console.error('Failed to create contact');
			}
		} catch (error) {
			console.error('Error creating contact:', error);
			throw new Error('Error creating contact');
		}
	}

	private async createDeal(contactId: string): Promise<void> {
		// Реализация метода для создания сделки по контакту
		try {
			const response = await fetch(https://www.amocrm.com/api/v4/leads, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
				},
				body: JSON.stringify({
						contacts_id: [contactId]
				})
			);

			if (response.ok) {
				console.log('Deal created successfully');
			} else {
				console.error('Failed to create deal');
			}
		} catch (error) {
			console.error('Error creating deal:', error);
			throw new Error('Error creating deal');
		}
	}
}