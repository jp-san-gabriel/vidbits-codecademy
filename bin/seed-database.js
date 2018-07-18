const Video = require('../models/video');
const {mongoose, databaseUrl, options} = require('../database');

const seed = async () => {
  await mongoose.connect(databaseUrl, options);

  await Video.create({
    title: '夏オンナ・久松郁実のたまらん灼熱ボディ！',
    description: 'もしも、無人島に漂流したら‥‥？　果てしなく広がる美しいビーチで、はちきれそうな重量級バストと引き締まったクビレを存分に見せつけてくれました!!',
    videoUrl: 'https://www.youtube.com/embed/0XsU0gNMoNs',
    comments:[{
        commenter: 'ガリガリの痩せさんじゃなくて、健康体なナイスバディがたまらないですね。﻿',
        comment: 'Nachito Nano'
    }]
  });
  await Video.create({
    title: 'TOP 10 FUNNIEST SUPER BOWL ADS - Best Ten Superbowl XLVIII 2014 Commercials',
    description: `SUBSCRIBE FOR MORE! ►►► http://bit.ly/SubMF Top 10 Super Bowl 2014 commercials in ONE video! SEE THE SEXIEST ADS HERE ►►► http://youtu.be/ixhYk4q0fK8 SEXIEST 2012 ADS ►►► http://youtu.be/hel2iKvvbKE 2013 SUPERBOWL ADS! http://youtu.be/zLtAOhol_jo TOP 2012 ADS HERE: http://youtu.be/dKMyCKx50kQ TOP 2011 ADS HERE: http://youtu.be/8lv4Y6kA9tE POSITIVE PRANKS! http://bit.ly/MFpranks DOUCHEBAGGERY PLAYLIST: http://bit.ly/D-bag FACEBOOK GIVEAWAYS! http://facebook.com/mediocrefilms T-SHIRTS! http://mediocrefilms.spreadshirt.com Agree with the Top 10? What's your favorite? Leave a COMMENT! A Llama counts down Superbowl 48's ten best ads, including: Wonderful Pistachios - Branding (featuring Stephen Colbert) Volkswagen - Wings Radio Shack - 80's Bud Light - Ian Up For Whatever (featuring Don Cheadle, Arnold Schwarzenegger & One Direction) Hyundai Genesis - Dad's Sixth Sense Carl's Jr - Philly Love (featuring Terrell Owens) TurboTax - Love Hurts Doritos - Time Machine Audi - Doberhuahua (featuring Sarah McLachlan) Honda - Hugfest (with Bruce Willis & Fred Armisen) The battle between the Denver Broncos & Seattle Seahawks in New York is not the only thing to look forward to in this Sunday's Super Bowl XLVIII. Advertisers paid a record breaking $4 million for each 30-second commercial spot. Also, the halftime show with Bruno Mars & the Red Hot Chili Peppers is a highly anticipated event. Music by Kevin MacLeod http://incompetech.com/ FOLLOW THE FUN ON TWITTER: http://twitter.com/mediocrefilms EXCLUSIVE VIDEOS: http://mediocrefilms.com MAIN CHANNEL: http://youtube.com/MediocreFilms 2ND CHANNEL: http://youtube.com/MediocreFilms2 YESHMIN CHANNEL: http://youtube.com/YESHMIN WEBSITE: http://www.mediocrefilms.com FACEBOOK: http://facebook.com/mediocrefilms T-SHIRTS! http://mediocrefilms.spreadshirt.com Thanks for Subscribing! :) Greg`,
    videoUrl: 'https://www.youtube.com/embed/2d-dZlxqs7g',
    comments:[{
        commenter: 'I like the Big Head Dogs .lol﻿',
        comment: 'Rednecks Gone Wild'
    },
    {
      commenter: 'I was alone though. The Bruce Willis commercial made me feel bad about myself.﻿',
      comment:'DiCaproductions'
    }]
  });
  await Video.create({
    title: 'Lollipop trip(อมยิ้มทริป) : Behind The scene "ICE" & interview - น้องไอซ์',
    description: `Fashion shoot behind the scene ทริปถ่ายภาพอมยิ้มทริป

เบื้องหลัง ทริปถ่ายภาพ อมยิ้มทริป
นางแบบ น้องไอซ์ สาวน้อยสุดน่ารัก สวย sexy อีกต่างหาก

ติดตามข่าวสาร ร่วมทริปถ่ายภาพได้ที่ อมยิ้มทริปอีเว้นได้เลย จัดจริง จัดเต็ม พริตตี้ นางแบบ อาชีพ ได้ภาพสวยๆ แน่นอนตาม link https://www.facebook.com/lollipopphot...

 Shot by : Acha Photography & Acha Film ( Photographer & Lollipop photoshoot's organizer)

ขอขอบคุณสถานที่ บ้านคุณยายสตูดิโอ https://www.facebook.com/grannyhouses...
กดติดตามได้นะครับ จะได้มีกำลังใจ นำผลงานมาให้ชมเรื่อยๆครับ`,
    videoUrl: 'https://www.youtube.com/embed/MrDTGCb9IbE',
    comments:[
      {
        commenter: 'cathy﻿',
        comment:'Beautiful'
      }
    ]
  });
};

seed()
  .then(() => {
    console.log('Seeded database successfully');
    process.exit(0);
  })
  .catch(err => {
    console.log('Failed to seed database');
    throw err;
    process.exit(1);
  });
