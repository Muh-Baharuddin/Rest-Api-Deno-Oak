import { Router } from "$oak/mod.ts";
import { Verification } from "/auth/verification/verification.types.ts";
import { VerificationDto, verificationValidate } from "/auth/verification/dto/verification.dto.ts";
import { validate } from "/middlewares/validate.ts";
import { verification } from "/auth/verification/verification.service.ts";

const verificationRouter = new Router();

verificationRouter
  .post("/", validate(verificationValidate), async (context): Promise<Verification> => {
    const verifDto: VerificationDto = await context.request.body().value;
    
    const newVerification = await verification(verifDto);
  return context.response.body = newVerification;
});

export default verificationRouter;