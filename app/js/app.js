jQuery(function($){
	query = {
		body: $('body'),
		errorText: $('.error'),
		addProductbtn: $('.wrap-buttons .add_product'),
		editProductbtn: $('table tr .edit'),
		deleteProductbtn: $('table tr .delete'),
		exportToJsonbtn : $('.export_product'),
		form: $('.wrap-add-form'),
		cancelBbtn: $('.cancel'),
		sendBtn: $('.send'),
		confirm: $('#confirm'),
		cancelConfirm: $('#cancel-confirm'),
		confirmationMessage: $('.confirmation-message'),
		confirmationProductName: $('.confirmation-text .product-name'),
		overlay: $('.overlay'),
		table: $('table tbody'),
		tableContent: $('.wrap-table .table'),
		noResult: $('.no-result'),
		title: $('#product-title'),
		sku: $('#product-sku'),
		price: $('#product-price')
	};

	// Model Start
	Model = function() {
		this.products = [];
	}

	Model.prototype = {
		setProduct: function(item) {
			this.products.push(item);
		},
		deleteProduct: function(index) {
			this.products.splice(index, 1);
		},
		updateProduct: function(index, newItem) {
			this.products[index] = newItem;
		},
		getProduct: function(index) {
			return this.products[index];
		},
		getAll: function(){
			return this.products;
		},
		exportToJson: function(data) {
			return JSON.stringify(data);
		},
	}
	// Model End

	//View start
	View = function(model) {
		this.model = model;

	}

	View.prototype = {
		clearForm: function(){
			query.title.val('');
			query.sku.val('');
			query.price.val('');
		},

		renderItems: function() {
			query.table.html('');
			var all = this.model.getAll();
			for(var i = 0; len = all.length, len > i; i++) {
				var row = "<tr data-product-id="+ i +"><td class='product-title'>"+ all[i].title +
				"</td><td class='product-sku'>"+ all[i].sku +
				"</td><td class='product-price'>$"+ all[i].price +
				"</td><td class='product-edit'><button class='edit btn btn-primary btn-info'>Edit</button></td>"+
				"<td class='product-delete'><button class='delete btn btn-primary btn-danger'>Delete</button></td></tr>";
				query.table.append(row);
			}
		},

		numericOnly: function(element) {
    		return element.keydown(function(e) {
            	var key = e.charCode || e.keyCode || 0;
            	if(key == 8 || key == 9 || key == 46 ||
	                (key >= 37 && key <= 40) || (key >= 48 && key <= 57) ||
	                (key >= 96 && key <= 105)){
	                	return key;
            	} else {
            		return false;
            	}
        	})
    	},

		activateForm: function() {
			query.errorText.text('');
			query.form.slideToggle();
		},

		showTableResult: function() {
			if (this.model.getAll().length > 0) {
				query.exportToJsonbtn.removeAttr('disabled');
				query.tableContent.show();
				query.noResult.hide();
			} else {
				query.exportToJsonbtn.attr('disabled', 'disabled');
				query.tableContent.hide();
				query.noResult.show();
				this.clearForm();
			}
		}
	};
	//View end


	//Controller start
	Controller = function(model, view) {
		this.model = model;
		this.view = view;
		var that = this;
		var index, text;

		query.sendBtn.click(function(event) {
			that.setItem();
		});

		query.addProductbtn.click(function(event) {
			that.openForm();
		});

		query.cancelBbtn.click(function(event) {
			that.cancelEnter();
		});


		//Delete
		query.body.on('click', 'table tr .delete', function(){
			that.showConfirmationMessage();
			index = $(this).parent().parent().data('productId');
			text = $(this).parent().parent()[0].childNodes[0].firstChild.data;
			query.confirmationProductName.text(text);
		});


		//Update
		query.body.on('click', 'table tr .edit', function(){
			$(this).parent().addClass('editing');
			index = $(this).parent().parent().data('productId');
			that.updateItem(index);
		});



		query.cancelConfirm.on('click', function(){
			that.cancelConfirm();
		});

		query.confirm.on('click', function(){
			that.confirm(index);
		});

		query.sku.focus(function(){
			that.checkInput($(this));
		});

		query.price.focus(function(){
			that.checkInput($(this));
		});
		query.exportToJsonbtn.click(function(){
			data = that.exportToJson();
			var windowOpen = window.open("", "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
			windowOpen.document.write(data);
		});

		
	}
	//Controller end


	Controller.prototype = {
		openForm: function() {
			this.view.activateForm();
		},
		
		cancelEnter: function() {
			this.view.clearForm();
			query.form.slideUp();
		},
		
		setItem: function() {
			if (query.title.val() == "" ||
				query.sku.val() == "" ||
				query.price.val() == "") {
				query.errorText.text('All fields must be filled');
				return false;
			} else {
				var Product = {
					title: query.title.val(),
					sku: query.sku.val(),
					price: query.price.val()
				}
				this.model.setProduct(Product);
				query.errorText.text('');
				query.table.html('');
				this.view.renderItems();
				this.view.clearForm();
				this.view.showTableResult();
				 
			}
		},

		updateItem: function (index) {
			oldProd = this.model.getProduct(index);
			query.title.val(oldProd.title);
			query.sku.val(oldProd.sku);
			query.price.val(oldProd.price);
			this.model.deleteProduct(index);
			
		},
		
		showConfirmationMessage: function() {
			query.overlay.show();
			query.confirmationMessage.show();
		},

		confirm: function(index) {
			this.model.deleteProduct(index);
			query.overlay.hide();
			query.confirmationMessage.hide();
			query.table.html('');
			this.view.renderItems();
			this.view.showTableResult();
			
		},

		cancelConfirm: function() {
			query.overlay.hide();
			query.confirmationMessage.hide();
		},

		checkInput: function(element){
			this.view.numericOnly(element);
		},
		exportToJson: function() {
			return this.model.exportToJson(this.model.getAll());
		}

	}




	var model = new Model();
	var view = new View(model);
	var controller = new Controller(model, view);
}); //end jquery