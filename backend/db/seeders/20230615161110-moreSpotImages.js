'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: `https://www.decorilla.com/online-decorating/wp-content/uploads/2019/01/cozy-traditional-cottage-interior-design.jpg`,
        preview: true
      },
      {
        spotId: 4,
        url: `https://media.houseandgarden.co.uk/photos/61893dfdf6acdd8ba4456021/4:3/w_1832,h_1374,c_limit/191127_hg_kate_haslett_shot_06print025x.jpg`,
        preview: false
      },
      {
        spotId: 4,
        url: `https://havenly.com/blog/wp-content/uploads/2021/11/V01-1710x970.jpeg`,
        preview: false
      },
      {
        spotId: 5,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-554287416948426155/original/405b20c6-9291-402d-a8e1-88a593de037e.jpeg`,
        preview: true
      },
      {
        spotId: 5,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-554287416948426155/original/0891421e-fd4f-49ef-85d9-a0ccaad39081.jpeg`,
        preview: false
      },
      {
        spotId: 5,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-554287416948426155/original/dcfb5b99-8aa2-46aa-a28f-df160dab7144.jpeg`,
        preview: false
      },
      {
        spotId: 5,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-554287416948426155/original/00d5a682-f6d7-4097-91fe-e08316ccfbe6.jpeg`,
        preview: false
      },
      {
        spotId: 5,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-554287416948426155/original/ccedfa19-ae16-4d6f-8667-e09e26450406.jpeg`,
        preview: false
      },
      {
        spotId: 6,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-749996089802009824/original/8fefceb0-da83-461c-9441-1dc5ce1c0174.jpeg`,
        preview: true
      },
      {
        spotId: 6,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-749996089802009824/original/375f3bdf-59b7-49c2-a9b5-c486465a08c7.jpeg`,
        preview: false
      },
      {
        spotId: 6,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-749996089802009824/original/edd3213c-40db-4391-b105-50811be85ef7.jpeg`,
        preview: false
      },
      {
        spotId: 6,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-749996089802009824/original/46e15925-53a4-4a4d-a25f-00c9f1a87bee.jpeg`,
        preview: false
      },
      {
        spotId: 6,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-749996089802009824/original/a9bc0013-6cc5-46f6-9d40-e79252112d04.jpeg`,
        preview: false
      },
      {
        spotId: 7,
        url: `https://a0.muscache.com/im/pictures/a57ab9ea-80d5-4ed0-aa15-ce536039778d.jpg`,
        preview: true
      },
      {
        spotId: 7,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-677112/original/a9014d8d-7a98-4dd2-91ab-7b69e140606d.jpeg`,
        preview: false
      },
      {
        spotId: 7,
        url: `https://a0.muscache.com/im/pictures/8961370/4466c2e0_original.jpg`,
        preview: false
      },
      {
        spotId: 7,
        url: `https://a0.muscache.com/im/pictures/32607798-4dfb-4fd9-8a1a-f71441acabb0.jpg`,
        preview: false
      },
      {
        spotId: 7,
        url: `https://a0.muscache.com/im/pictures/2ea6c421-8009-442b-94c2-9a95a39ce51c.jpg`,
        preview: false
      },
      {
        spotId: 8,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-36767861/original/ffcc6215-0b1c-4e8c-b2e0-473b3c801014.jpeg`,
        preview: true
      },
      {
        spotId: 8,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-36767861/original/3c56533f-5eee-4ac5-b9f2-bf4552ace4bf.jpeg`,
        preview: false
      },
      {
        spotId: 8,
        url: `https://a0.muscache.com/im/pictures/c278171f-45be-4ff6-803a-7aa6a76c373b.jpg`,
        preview: false
      },
      {
        spotId: 8,
        url: `https://a0.muscache.com/im/pictures/b0a6016f-ca09-4b4e-a2a3-de9a4bb8faa7.jpg`,
        preview: false
      },
      {
        spotId: 8,
        url: `https://a0.muscache.com/im/pictures/151debe0-c41a-4d2b-8bae-0a6ee23e470c.jpg`,
        preview: false
      },
      {
        spotId: 9,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-839446104792307139/original/8025ba5f-180c-47a8-bfae-d688aecf854f.jpeg`,
        preview: true
      },
      {
        spotId: 9,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-839446104792307139/original/a0e0bd45-d71d-4117-833d-e79b1cd9071b.jpeg`,
        preview: false
      },
      {
        spotId: 9,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-839446104792307139/original/f3afbf4d-61fd-4414-954b-75a049bc8e81.jpeg`,
        preview: false
      },
      {
        spotId: 9,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-839446104792307139/original/35794cce-b857-44b5-8218-dc21e78dfcbd.jpeg`,
        preview: false
      },
      {
        spotId: 9,
        url: `https://a0.muscache.com/im/pictures/miso/Hosting-839446104792307139/original/35794cce-b857-44b5-8218-dc21e78dfcbd.jpeg`,
        preview: false
      },
      {
        spotId: 10,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-37527489/original/97a294eb-8cad-473f-a8a1-f18d31ecb9fd.jpeg`,
        preview: true
      },
      {
        spotId: 10,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-37527489/original/30e9e115-b9bc-4a73-bac8-efe84151a91b.jpeg`,
        preview: false
      },
      {
        spotId: 10,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-37527489/original/79da1e53-4989-487f-b5c3-4c1874b10f76.jpeg`,
        preview: false
      },
      {
        spotId: 10,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-37527489/original/9d517538-44d1-4922-b402-838869161a6b.jpeg`,
        preview: false
      },
      {
        spotId: 10,
        url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-37527489/original/509b6111-f00f-4a19-a228-6216045060e0.jpeg`,
        preview: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
