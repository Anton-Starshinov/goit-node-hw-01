const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(id) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);
  if (!result) {
    return null;
  }

  return result;
}

async function removeContact(id) {
  const contact = await listContacts();
  const idx = contact.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = contact.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contact = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact));
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
