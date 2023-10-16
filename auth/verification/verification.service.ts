import { findCode, insertVerif } from "/auth/verification/verification.repository.ts";
import { ObjectId } from "$mongo/mod.ts";
import { VerificationDto } from "/auth/verification/dto/verification.dto.ts";
import { Verification } from "/auth/verification/verification.types.ts";
import { client } from "/denomailer.config.ts";
import { Context } from "$oak/mod.ts";

export const verification = async (verifDto: VerificationDto): Promise<Verification> => {
  const verifData = verificationByDto(verifDto);

  try {
    await client.send({
      from: Deno.env.get("MAILER_USERNAME")!,
      to: verifData.email,
      subject: "Confirmation email",
      content: "auto",
      html: `<p>Terima kasih telah mendaftar berikut Kode verifikasi anda ${verifData.verificationCode}.</p>`,
    });
    
    await client.close();
  } catch (error) {
    console.log("error", error)
  }

  return await insertVerif(verifData)
}

const generateRandomNumber = () => {
  const minm = 100000;
  const maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

const verificationByDto = (verifDto : VerificationDto): Verification => {
  const verifCode = generateRandomNumber().toString();

  const now = new Date();

  const data: Verification = {
    _id: new ObjectId(),
    email: verifDto.email,
    verificationCode: verifCode,
    created_at: now,
    expired_at: new Date(now.getTime() + 60 * 60 * 1000),
  }
  return data
}

export const findVerifCode = async (email: string, verificationCode: string, context: Context) => {
  const verifCode = await findCode(email, verificationCode);
  if(verifCode === undefined) {
    context.throw(400, "invalid code");
  }
  return verifCode;
}
