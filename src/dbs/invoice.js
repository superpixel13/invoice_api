/**
 * Module for managing the dbs for invoice
 * @module dbs/invoice
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
   * Call mongodb for adding an invoice to the database
   * @param {invoice} invoice The invoice to add to the database
   * @return {invoice} The invoice added with the id
   **/
  insert: (invoice) => {
    return model.create(invoice)
  },
  /**
   * Call mongodb for getting an invoice by login
   * @param {String} login The login to search
   * @return {invoice} The invoice found or null
   **/
  get_invoice_by_login: (login) => {
    return model.findOne({ $or: [{ email: login }, { invoicename: login }] })
  },
  /**
   * Call mongodb for getting an invoice by id
   * @param {String} id The id to search
   * @return {invoice} The invoice found or null
   **/
  get_invoice_by_id: (id) => {
    return model.findOne({ _id: id })
  },
  /**
   * Call mongodb for inserting many
   * @param {Array[]} invoice Contain an array of invoice
   * @return {companies} return the array of invoice saved
   */
  insert_many: (invoice) => {
    return model.insertMany(invoice)
  },
  /**
   * Update a document in mongodb respecting the condtion
   * @param {Object} filter The condition the document has to respect
   * @param {Object} update The update to apply
   * @return {invoice} The document updated or null
   **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  /**
   * Call mongodb for testing the existence of an invoice by email
   * @param {String} invoicename The invoicename to search
   * @return {boolean} True if a document exist or else False
   **/
  test_invoice_by_email: (email) => {
    return model.exists({ email: email })
  }
}