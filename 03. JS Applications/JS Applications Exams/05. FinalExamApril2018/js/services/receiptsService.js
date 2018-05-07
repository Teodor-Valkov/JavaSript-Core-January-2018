let receiptsService = (() => {
  function getActiveReceiptByUserId(userId) {
    return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":true}`, 'kinvey');
  }

  function getAllReceiptsByUserId(userId) {
    return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":false}`, 'kinvey');
  }

  function createReceipt(receipt) {
    return requester.post('appdata', 'receipts', 'kinvey', receipt);
  }

  function updateReceipt(receiptId, receipt) {
    return requester.update('appdata', `receipts/${receiptId}`, 'kinvey', receipt)
  }

  return {
    getActiveReceiptByUserId,
    getAllReceiptsByUserId,
    createReceipt,
    updateReceipt
  }
})()