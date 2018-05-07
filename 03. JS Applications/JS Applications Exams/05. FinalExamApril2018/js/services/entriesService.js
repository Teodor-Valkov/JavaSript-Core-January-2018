let entriesService = (() => {
  function getEntriesInReceiptByReceiptId(receiptId) {
    return requester.get('appdata', `entries?query={"receiptId":"${receiptId}"}`, 'kinvey');
  }

  function addEntry(entry) {
    return requester.post('appdata', 'entries', 'kinvey', entry);
  }

  function deleteEntry(entryId) {
    return requester.remove('appdata', `entries/${entryId}`, 'kinvey');
  }

  return {
    getEntriesInReceiptByReceiptId,
    addEntry,
    deleteEntry
  }
})()