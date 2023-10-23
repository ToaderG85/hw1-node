const { addContact, getContactById, removeContact, listContacts } = require('./contacts.js');

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone}) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;
    case "add":
      await addContact(name, email, phone);
      console.log("Contactul a fost adaugat cu succes.");
      break;
    case "remove":
      await removeContact(id);
      console.log("Contactul a fost sters.");
    break;
    default:
        console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
