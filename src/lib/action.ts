'use server';

import nodemailer from 'nodemailer';

// nodemailer를 사용하기 위해서는 transporter를 생성해야 한다.
// transporter는 이메일을 보내는 역할을 한다.
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  service: 'naver',
  auth: {
    user: process.env.NEXT_PUBLIC_NAVER_ID,
    pass: process.env.NEXT_PUBLIC_NAVER_PW,
  },
});

export const sendEmail = async (prevState: any, formData: FormData) => {
  try {
    const { name, email, subject } = Object.fromEntries(formData); // FormData를 Object로 변환

    if (!name || !email || !subject) {
      return { message: '모든 항목을 입력해주세요.' };
    }

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_NAVER_ID, // 보내는 이메일
      to: email && String(email), // 받는 이메일
      subject: `[Wraffle] 비밀번호 재설정`, // 이메일 제목
      html: `<span>안녕하세요, Wraffle입니다.</span><br />
             <span>${email} 계정의 비밀번호 재설정이 필요하시면 아래 버튼을 눌러주세요.</span><br /><br />
             <a href="http://localhost:3000" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border: none; cursor: pointer;">비밀번호 재설정</a><br /><br />`,
    });

    console.log('이메일 전송 성공!');
    return { message: '이메일 전송 성공!' };
  } catch (error) {
    console.error(error);
  }
};

// 여러 이메일로 보내고 싶다면 아래와 같이 작성하면 된다.
// to: ['받는 이메일 주소1', '받는 이메일 주소2', '받는 이메일 주소3'];
