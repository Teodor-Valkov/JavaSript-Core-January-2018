function tickets (input, criteria) {
  class Ticket {
    constructor (destination, price, status) {
      this.destination = destination;
      this.price = price;
      this.status = status;
    }
  }

  let unsortedTickets = [];

  for (let line of input) {
    let [destination, price, status] = line.split('|');
    price = Number(price);

    let ticket = new Ticket(destination, price, status);
    unsortedTickets.push(ticket);
  }

  let sortedTckets;

  switch (criteria) {
    case 'destination':
      sortedTckets = unsortedTickets.sort((a, b) => a.destination.localeCompare(b.destination));
      break;
    case 'price':
      sortedTckets = unsortedTickets.sort((a, b) => a.price - b.price);
      break;
    case 'status':
      sortedTckets = unsortedTickets.sort((a, b) => a.status.localeCompare(b.status));
      break;
  }

  return sortedTckets;
}

let firstTickets = tickets(['Philadelphia|94.20|available',
  'New York City|95.99|available',
  'New York City|95.99|sold',
  'Boston|126.20|departed'],
'destination');

let secondTickets = tickets(['Philadelphia|94.20|available',
  'New York City|95.99|available',
  'New York City|95.99|sold',
  'Boston|126.20|departed'],
'status');

console.log(firstTickets);
console.log(secondTickets);
