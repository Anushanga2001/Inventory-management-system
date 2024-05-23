// handle the request ( get, post, put, delete )
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersController1 = require('../controllers/userSignin');
const usersController2 = require('../controllers/handleitems');
const usersController3 = require('../controllers/handlecompanyorders');
const usersController4 = require('../controllers/displayitems');
const usersController5 = require('../controllers/handleshoporders');
const usersController6 = require('../controllers/notification');

router.post('/add_user', usersController.addUser);
router.get('/get_users', usersController.getUsers);
router.get('/get_user/:userID', usersController.getUser);
router.put('/update_users/:userID', usersController.updateUsers);
router.put('/update_userss/:userID', usersController.updateUserss);

router.put('/update_user/:userId', usersController.updateUser);
router.delete('/delete_users/:userID', usersController.deleteUser);

router.post('/signin', usersController1.signIn);

router.post('/add_item', usersController2.addItem);
router.post('/add_item00', usersController2.addItem00);
router.get('/get_itemss', usersController2.getItems01);
router.get('/gets_item/:itemName', usersController2.getsItems);
router.get('/get_items/:ItemNo', usersController2.getItem)
router.get('/get_items', usersController2.getItems90);
router.get('/get_item040', usersController2.getItem040);
router.delete('/delete_items/:itemNo/:batchNo', usersController2.deleteItem);

router.post('/add_companyorders', usersController3.addCompanyOrders);
router.get('/get_companyorders', usersController3.getCompanyOrders);
router.get('/get_order_details/:orderno', usersController3.getCompanyOrdersByOrderNo)

router.post('/add_shoporders', usersController5.addShopOrders);
router.get('/get_shoporders', usersController5.getShopOrders);
router.get('/get_shoporders/:orderNo', usersController5.getshopOrderByOrderNo)
router.get('/get_shoporder_details/:orderNo', usersController5.getshopOrdersByOrderNo)

router.get('/display_items', usersController4.getdisplay)
router.post('/add_notifications', usersController6.addnotifications)
router.delete('/delete_notification/:itemNo/:batchNo', usersController6.deletenotifications)
module.exports = router;
