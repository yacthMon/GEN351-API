# ใครไม่ย่า ครัวคุณย่า API

### Prerequisites

You need to install [NodeJS](https://nodejs.org/en/) and you need to prepare Google API [Google API](https://console.developers.google.com/cloud-resource-manager).

__Setup Instructions__

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project
  - In the sidebar on the left, expand __APIs & auth__ > __APIs__
  - Search for "drive"
  - Click on "Drive API"
  - click the blue "Enable API" button
4. Create a service account for your project
  - In the sidebar on the left, expand __APIs & auth__ > __Credentials__
  - Click blue "Add credentials" button
  - Select the "Service account" option
  - Select "Furnish a new private key" checkbox
  - Select the "JSON" key type option
  - Click blue "Create" button
  - your JSON key file is generated and downloaded to your machine (__it is the only copy!__)
  - note your service account's email address (also available in the JSON key file)
5. Share the doc (or docs) with your service account using the email noted above
6. Set sheet ID in ```model/sheet_manage.js``` at line 5


## Google's API Limitations

Google's API is somewhat limiting. Calls are made to two differently designed APIs, one made to deal with cells, and one to deal with rows. These APIs will let you manage the data in your sheets, but you cannot make any modifications to the formatting of the cells.

### Installing

Installing node module

```
npm i
```

# Documents

**Add new transaction for front shop**
----
  Returns id as json data.

* **URL**

  /front/add

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `menu` : menu detail
  `amount` : amount

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    { 
        "msg": "Transcript created.",
        "transcript_id": 1
    }
    ```
 
  OR
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err" : "error"
    }
    ```
    
* **Sample Call**
Javascript
  ```javascript
    $.ajax({
      url: "/front/add",
      dataType: "json",
      method : "POST",
      data: {
        "menu": "อกไก่ดับเบิ้ลสมุนไพร",
        "amount": 2,
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Order**
----
  Returns result as json data.

* **URL**

  /order/order

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `menu` : menu detail
  `amount` : amount
  `customer_name` : customer name
  `pickup_location` : pick location
  `phone` : customer phone

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "Order created.",
        "order_id" : 1
    }
    ```
 
  OR
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/order",
      dataType: "json",
      method : "POST",
      data: {
        "menu": "ทริปเปิ้ลสมุนไพร ซีฟู๊ด 1 เกาหลี 1",
        "amount":  2,
        "customer_name": "คุณไกรทอง",
        "pickup_location": "สระมรกต",
        "phone": "080-000-0000"
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Cooking Order**
----
  Change order status to cooking and returns result as json data.

* **URL**

  /order/cooking

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `id` : order id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
        "msg" : "Order status Cancel.", 
        "order_id" : 1
    }
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/cooking",
      dataType: "json",
      method : "POST",
      data: {
       "id":1
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Transit Order**
----
  Change order status to In-Transit and returns result as json data.

* **URL**

  /order/transit

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `id` : order id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
        "msg" : "Order status Cancel.", 
        "order_id" : 1
    }
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/transit",
      dataType: "json",
      method : "POST",
      data: {
       "id":1
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Delivered Order**
----
  Change order status to Delivered and returns result as json data.

* **URL**

  /order/delivered

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `id` : order id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
        "msg" : "Order status Cancel.", 
        "order_id" : 1
    }
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/delivered",
      dataType: "json",
      method : "POST",
      data: {
       "id":1
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Cancel Order**
----
  Change order status to Cancel and returns result as json data.

* **URL**

  /order/cancel

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  `id` : order id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
        "msg" : "Order status Cancel.", 
        "order_id" : 1
    }
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```

**Get Order Detail**
----
  Returns result as json data.

* **URL**

  /order/:orderId

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `orderId` : order id
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
        "id": 1,
        "order_detail": "ทดสอบ order จาก api",
        "customer_name": "ยอสเอง",
        "pickup_location": "หน้าตึก SIT",
        "phone": "08ไม่บอกหรอก",
        "oreder_status": "รับออเดอร์",
        "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)" 
    }
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/received",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get Received Order**
----
  Returns result as json data.

* **URL**

  /order/received

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [ 
        {
            "id" : "1",
            "order_detail" : "ทดสอบ order จาก api",
            "customer_name" : "ยอสเอง",
            "pickup_location" : "หน้าตึก SIT",
            "phone" : "08ไม่บอกหรอก",
            "oreder_status" : "รับออเดอร์",
            "oredered_date" : "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        },
        { 
            "id": "2",
            "order_detail": "ทดสอบ order จาก api",
            "customer_name": "ยอสเอง",
            "pickup_location": "หน้าตึก SIT",
            "phone": "08ไม่บอกหรอก",
            "oreder_status": "รับออเดอร์",
            "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        }
    ]
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/received",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Get Cooking Order**
----
  Get cooking orders.

* **URL**

  /order/cooking

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [ 
        {
            "id" : "1",
            "order_detail" : "ทดสอบ order จาก api",
            "customer_name" : "ยอสเอง",
            "pickup_location" : "หน้าตึก SIT",
            "phone" : "08ไม่บอกหรอก",
            "oreder_status" : "รับออเดอร์",
            "oredered_date" : "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        },
        { 
            "id": "2",
            "order_detail": "ทดสอบ order จาก api",
            "customer_name": "ยอสเอง",
            "pickup_location": "หน้าตึก SIT",
            "phone": "08ไม่บอกหรอก",
            "oreder_status": "รับออเดอร์",
            "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        }
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:**      
    ```json
        {
            "err":"error"
        }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/cooking",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Get Transit Order**
----
  Returns result as json data.

* **URL**

  /order/transit

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [ 
        {
            "id" : "1",
            "order_detail" : "ทดสอบ order จาก api",
            "customer_name" : "ยอสเอง",
            "pickup_location" : "หน้าตึก SIT",
            "phone" : "08ไม่บอกหรอก",
            "oreder_status" : "กำลังส่ง",
            "oredered_date" : "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        },
        { 
            "id": "2",
            "order_detail": "ทดสอบ order จาก api",
            "customer_name": "ยอสเอง",
            "pickup_location": "หน้าตึก SIT",
            "phone": "08ไม่บอกหรอก",
            "oreder_status": "กำลังส่ง",
            "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        }
    ]
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/transit",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Get Delivered Order**
----
  Returns result as json data.

* **URL**

  /order/delivered

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [ 
        {
            "id" : "1",
            "order_detail" : "ทดสอบ order จาก api",
            "customer_name" : "ยอสเอง",
            "pickup_location" : "หน้าตึก SIT",
            "phone" : "08ไม่บอกหรอก",
            "oreder_status" : "ส่งเสร็จแล้ว",
            "oredered_date" : "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        },
        { 
            "id": "2",
            "order_detail": "ทดสอบ order จาก api",
            "customer_name": "ยอสเอง",
            "pickup_location": "หน้าตึก SIT",
            "phone": "08ไม่บอกหรอก",
            "oreder_status": "ส่งเสร็จแล้ว",
            "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        }
    ]
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/delivered",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Get Cancel Order**
----
  Returns result as json data.

* **URL**

  /order/cancel

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [ 
        {
            "id" : "1",
            "order_detail" : "ทดสอบ order จาก api",
            "customer_name" : "ยอสเอง",
            "pickup_location" : "หน้าตึก SIT",
            "phone" : "08ไม่บอกหรอก",
            "oreder_status" : "ยกเลิก",
            "oredered_date" : "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        },
        { 
            "id": "2",
            "order_detail": "ทดสอบ order จาก api",
            "customer_name": "ยอสเอง",
            "pickup_location": "หน้าตึก SIT",
            "phone": "08ไม่บอกหรอก",
            "oreder_status": "ยกเลิก",
            "oredered_date": "Mon Apr 23 2018 19:20:55 GMT+0700 (SE Asia Standard Time)"
        }
    ]
    ```
  
* **Error Response:**
  * **Code:** 500 <br />
    **Content:**      
    ```json
    {
        "err": "error"
    }
    ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/cancel",
      dataType: "json",
      method : "GET",
      data: { }
      success : function(r) {
        console.log(r);
      }
    });
  ```
    
* **Sample Call**
    Javascript
  ```javascript
    $.ajax({
      url: "/order/cancel",
      dataType: "json",
      method : "POST",
      data: {
       "id":1
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```
## Built With

* [NodeJS](https://nodejs.org/en/)

## Authors

* **Wasawat Lertjankhajorn** - [yacth_Mon](https://github.com/yacthMon)
