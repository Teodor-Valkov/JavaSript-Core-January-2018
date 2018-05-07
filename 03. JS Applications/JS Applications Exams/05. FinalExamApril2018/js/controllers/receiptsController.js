let receiptsController = (() => {
  // Get Editor
  function getEditor(context) {
    let userId = sessionStorage.getItem('userId');
    let username = sessionStorage.getItem('username');
    context.username = username;

    // Get the active receipt of the currently logged in user
    receiptsService.getActiveReceiptByUserId(userId)
      .then((activeReceipts) => {
        let hasActiveReceipt = activeReceipts.length !== 0;

        if (!hasActiveReceipt) {
          let receipt = {
            "active": true,
            "productCount": 0,
            "total": 0
          };

          // Create active receipt for the currently logged in user
          receiptsService.createReceipt(receipt)
            .then(() => {
              loadPage(context);
            })
            .catch(notification.displayError);
        } else {
          let receiptId = activeReceipts[0]._id;

          // Get the entries of the active receipt of the currently logged in user
          entriesService.getEntriesInReceiptByReceiptId(receiptId)
            .then((activeEntries) => {
              let total = 0;
              let productCount = 0

              for (let entry of activeEntries) {
                entry.subTotal = (entry.qty * entry.price).toFixed(2);
                entry.price = entry.price.toFixed(2);
                entry.active = true;
                productCount += entry.qty;
                total += entry.qty * entry.price;
              }

              context.entriesList = activeEntries;
              context.receiptId = receiptId;
              context.productCount = productCount;
              context.total = total.toFixed(2);

              loadPage(context);
            })
            .catch(notification.displayError);;
        }
      })
      .catch(notification.displayError);
  }

  // Get Overview
  function getOverview(context) {
    let userId = sessionStorage.getItem('userId');
    let username = sessionStorage.getItem('username');
    context.username = username;

    // Get all receipts of the currently logged in user except the active receipt
    receiptsService.getAllReceiptsByUserId(userId)
      .then((receipts) => {
        let totalSum = 0;

        for (let receipt of receipts) {
          totalSum += receipt.total;
          receipt.creationDate = formatDate(receipt._kmd.ect);
          receipt.total = receipt.total.toFixed(2);
        }

        context.receiptList = receipts;
        context.totalSum = totalSum.toFixed(2);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            receiptItem: './templates/receipts/receiptItem.hbs',
            page: './templates/receipts/overview.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs');
          });
      })
      .catch(notification.displayError);;
  }

  // Get Receipt Details
  function getReceiptDetails(context) {
    let receiptId = context.params.id.substr(1);
    let userId = sessionStorage.getItem('userId');
    let username = sessionStorage.getItem('username');
    context.username = username;

    // Get the entries of the desired receipt of the currently logged in user    
    entriesService.getEntriesInReceiptByReceiptId(receiptId)
      .then((entries) => {
        for (let entry of entries) {
          entry.subTotal = (entry.qty * entry.price).toFixed(2);
          entry.price = entry.price.toFixed(2);
        }

        context.entriesList = entries;

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            entryItem: './templates/entries/entryItem.hbs',
            page: './templates/receipts/receiptDetails.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs');
          });
      })
      .catch(notification.displayError);;
  }

  // Create Receipt
  function createReceipt(context) {
    let receiptId = context.params.receiptId;
    let productCount = Number(context.params.productCount);
    let total = Number(context.params.total);

    if (productCount === 0 || total === 0) {
      notification.showError('You cannot checkout an empty receipt.');
      return;
    }

    let receipt = {
      "active": false,
      "productCount": productCount,
      "total": total,
    };

    // Update the active receipt of the currently logged in user to become inactive
    receiptsService.updateReceipt(receiptId, receipt)
      .then(() => {
        notification.showInfo('Receipt checked out.');
        context.redirect('#/editor');
      })
      .catch(notification.displayError);
  }

  // Load partials and partial
  function loadPage(context) {
    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        receiptForm: './templates/receipts/receiptForm.hbs',
        entryForm: './templates/entries/entryForm.hbs',
        entryItem: './templates/entries/entryItem.hbs',
        page: './templates/receipts/editor.hbs'
      })
      .then(function () {
        this.partial('./templates/main.hbs');
      });
  }

  function formatDate(fullDate) {
    let date = new Date(fullDate);

    if (Number.isNaN(date.getDate())) {
      return '';
    }

    return date.getFullYear() + '-' + padZeros(date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + padZeros(date.getMinutes());

    function padZeros(number) {
      return ('0' + number).slice(-2);
    }
  }

  return {
    getEditor,
    getOverview,
    getReceiptDetails,
    createReceipt
  };
})()