'use server';

export const sendEmail = async (prevState: any, formData: FormData) => {
  try {
    const { name, email, subject } = Object.fromEntries(formData); // FormData를 Object로 변환

    console.log(name, email, subject);
  } catch (error) {
    console.error(error);
  }
};
