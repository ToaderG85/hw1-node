const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log(contactsPath);

// ! list contacts

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Eroare la citirea fisierului:", error);
    return;
  }
}

// ! get contact by id

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.error(error);
    return;
  }
}

// ! remove contact

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error("Eroare la scrierea fisierului:", error);
  }
}

// ! add contact
async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    console.error("Trebuie sa completezi datele contactului");
    return;
  }

  try {
    const contacts = await listContacts();
    const newContact = { id: String(Date.now()), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), {
      encoding: "utf-8",
    });
    console.log("Contactul a fost adaugat!");
  } catch (error) {
    console.error("Eroare la scrierea fisierului:", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
