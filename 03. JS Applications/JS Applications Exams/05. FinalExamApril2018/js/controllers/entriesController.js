let entriesController = (() => {
  // Create Entry
  function addEntry(context) {
    let userId = sessionStorage.getItem('userId');
    let username = sessionStorage.getItem('username');
    context.username = username;

    let type = context.params.type;
    let qty = context.params.qty;
    let price = context.params.price;

    if (!validateType(type)) {
      return;
    }

    if (!validateNumber(qty)) {
      return;
    }

    if (!validateNumber(price)) {
      return;
    }

    // Get the active receipt of the currently logged in user    
    receiptsService.getActiveReceiptByUserId(userId)
      .then((activeReceipt) => {
        let receiptId = activeReceipt[0]._id;

        // Get the entries of the active receipt of the currently logged in user        
        entriesService.getEntriesInReceiptByReceiptId(receiptId)
          .then((activeEntries) => {
            qty = Number(qty);
            price = Number(price);

            let entry = {
              type,
              qty,
              price,
              receiptId
            };

            // Add new entry to the active receipt of the currently logged in user
            entriesService.addEntry(entry)
              .then(() => {
                notification.showInfo('Entry added.');
                context.redirect('#/editor');
              })
              .catch(notification.displayError)
          })
          .catch(notification.displayError);
      })
      .catch(notification.displayError);
  }

  // Delete Entry
  function deleteEntry(context) {
    let entryId = context.params.id.substr(1);

    // Delete the entry from the active receipt of the currently logged in user
    entriesService.deleteEntry(entryId)
      .then(() => {
        notification.showInfo('Entry removed.');
        context.redirect('#/editor');
      })
      .catch(notification.displayError)
  };

  // Validate product name
  function validateType(type) {
    if (!type) {
      notification.showError('Product Name should not be empty.');
      return false;
    }

    return true;
  }

  // Validate quantity and price
  function validateNumber(number) {
    if (isNaN(number) || !number || number === '0') {
      notification.showError('Please enter a valid number.');
      return false;
    }

    return true;
  }

  return {
    addEntry,
    deleteEntry
  };
})()