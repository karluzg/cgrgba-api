import 'reflect-metadata'
import { expect } from 'chai'
import axios from 'axios'

const baseURL = 'http://localhost:3000'; // Defina a URL base do seu aplicativo
// Definir o token de autenticação
const authToken = 'My Fucking token';

const api  = axios.create({
    baseURL: baseURL, // Substitua pela URL da sua API
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

describe('Testes de integração para o módulo de utilizadors', () => {
  it('Deve criar um novo utilizador', async () => {
    const newUser = {
      fullName: 'Carlos Gomes',
      mobileNumber: '123456789',
      email: 'karluzg@gmail.com',
    };

    const response = await api.post('/users', newUser);

    expect(response.status).equal(200);
    expect(response.data).be.an('object');
    expect(response.data).have.property('id');
    expect(response.data).have.property('fullName').equal(newUser.fullName);
    expect(response.data).have.property('mobileNumber').equal(newUser.mobileNumber);
    expect(response.data).have.property('email').equal(newUser.email);
  });

  it('Deve retornar uma lista de utilizadors', async () => {
    const response = await api.get('/users');

    expect(response.status).equal(200);
    expect(response.data).be.an('array');
    expect(response.data).have.lengthOf.at.least(1);
  });

  it('Deve retornar um utilizador pelo ID', async () => {
    const userId = '123456'; // Substitua pelo ID de um utilizador existente

    const response = await api.get(`/users/${userId}`);

    expect(response.status).equal(200);
    expect(response.data).be.an('object');
    expect(response.data).have.property('id').equal(userId);
  });

  it('Deve retornar um utilizador pelo email', async () => {
    const userEmail = 'john@example.com'; // Substitua pelo email de um utilizador existente
  
    const response = await api.get(`/users/email/${userEmail}`);
  
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('email').equal(userEmail);
  });

  it('Deve atualizar um utilizador', async () => {
    const userId = '123'; // Substitua pelo ID de um utilizador existente
    const userData = {
      fullName: 'John Doe',
      mobileNumber: '1234567890',
      email: 'john@example.com',
    }; // Substitua pelas informações atualizadas do utilizador
  
    const response = await api.put(`/users`, userData);
  
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('id').equal(userId);
    expect(response.data).to.have.property('fullName').equal(userData.fullName);
    expect(response.data).to.have.property('mobileNumber').equal(userData.mobileNumber);
    expect(response.data).to.have.property('email').equal(userData.email);
  });

  it('Deve resetar a Password de um utilizador', async () => {
    const email = 'john@example.com'; // Substitua pelo email válido de um utilizador existente
    const resetPasswordData = {
      password: 'newpassword',
      confirmPassword: 'newpassword',
    }; // Substitua pelas novas informações de Password
  
    const response = await api.put(`/users/password/reset`, resetPasswordData, { params: { email } });
  
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('message').equal('Password do utilizador redefinida com sucesso.');
  });


  it('Deve atualizar a Password de um utilizador', async () => {
    const userId = '2'; // Substitua pelo ID válido de um utilizador existente
    const updatePasswordData = {
      oldPassword: 'oldpassword',
      newPassword: 'newpassword',
      confirmPassword: 'newpassword',
    }; // Substitua pelas novas informações de Password
  
    const response = await api.put(`/users/password`, updatePasswordData, { params: { id: userId } });
  
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('message').equal('Password do utilizador atualizada com sucesso.');
  });

});
