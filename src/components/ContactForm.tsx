import { css } from "../../styled-system/css";
import { ValidatedForm, FormField, FormSelect, FormRadioGroup } from "./form";
import { formLabel } from "../styles/recipes";
import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import SuccessSubmitModal from "./SuccessSubmitModal";
import PrivacyModal from "./PrivacyModal";

const schema = z
  .object({
    name: z.string().min(2, { message: "Must be 2–64 characters long" }).max(64, { message: "Must be 2–64 characters long" }),
    companyName: z
      .string()
      .min(2, { message: "Must be 2–64 characters long" })
      .max(64, { message: "Must be 2–64 characters long" }),
    business_sectors: z.string({
      required_error: "Please select your business sector",
    }),
    preferred_contact: z.enum(["Telegram", "Phone", "Email"]),
    contact_info_telegram: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 2 && val.startsWith("@") && val.length <= 64), {
        message: "Must start with @ and be 2–64 characters long",
      }),
    contact_info_phone: z
      .string()
      .optional()
      .refine((val) => !val || /^\d+$/.test(val), {
        message: "Please enter a valid phone number",
      }),
    contact_info_email: z
      .string()
      .optional()
      .refine((val) => !val || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
        message: "Invalid email address",
      }),
    message: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.preferred_contact === "Telegram" && !data.contact_info_telegram) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["contact_info_telegram"], message: "Telegram is required" });
    }
    if (data.preferred_contact === "Phone" && !data.contact_info_phone) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["contact_info_phone"], message: "Phone is required" });
    }
    if (data.preferred_contact === "Email" && !data.contact_info_email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["contact_info_email"], message: "Email is required" });
    }
  });

type ContactFormValues = z.infer<typeof schema>;

const controlOptions = [
  {
    value: "Operator",
    label: "Operator",
  },
  {
    value: "Platform Provider",
    label: "Platform Provider",
  },
  {
    value: "Game Provider",
    label: "Game Developer",
  },
  {
    value: "Aggregators",
    label: "Aggregators",
  },
  {
    value: "Reseller",
    label: "Reseller",
  },
  {
    value: "API Integrator",
    label: "API Integrator",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const radioOptions = [
  {
    value: "Telegram",
    label: "Telegram",
  },
  {
    value: "Phone",
    label: "Phone",
  },
  {
    value: "Email",
    label: "Email",
  },
];

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const handleSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setIsOpenSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ValidatedForm<ContactFormValues>
        schema={schema}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        defaultValues={{
          name: "",
          companyName: "",
          business_sectors: "Operator",
          preferred_contact: "Telegram",
          contact_info_telegram: "",
          contact_info_phone: "",
          contact_info_email: "",
          message: "",
        }}
        size="sm"
        submitButtonSize="full"
        submitButtonClassName={css({
          borderRadius: "8px !important",
          fontSize: "18px",
        })}
        className={css({
          gap: "16px",
          minHeight: "auto",
          maxHeight: "none",
        })}
      >
        {({ register, control, formState: { errors }, watch, reset, trigger }) => {
          const preferredContact = watch("preferred_contact");

          useEffect(() => {
            const subscription = watch((value, { name }) => {
              if (name === "preferred_contact") {
                // 清除所有联系方式的值
                const updates = {
                  contact_info_telegram: "",
                  contact_info_phone: "",
                  contact_info_email: "",
                };
                
                // 使用reset保持其他字段值
                reset((formValues) => ({
                  ...formValues,
                  ...updates
                }), {
                  keepDefaultValues: true,
                });
                
                // 确保新的联系方式字段会被验证
                const currentContact = value.preferred_contact;
                if (currentContact) {
                  const fieldName = `contact_info_${currentContact.toLowerCase()}` as keyof ContactFormValues;
                  trigger(fieldName);
                }
              }
            });
            
            return () => subscription.unsubscribe();
          }, [watch, reset, trigger]);

          const contactFieldProps = {
            Telegram: { name: "contact_info_telegram" as const, placeholder: "Enter your Telegram", type: "text" as const },
            Phone: {
              name: "contact_info_phone" as const,
              placeholder: "Enter your phone number",
              type: "tel" as const,
            },
            Email: { name: "contact_info_email" as const, placeholder: "Enter your Email", type: "email" as const },
          };

          const currentProps = contactFieldProps[preferredContact as keyof typeof contactFieldProps];
          const currentError = currentProps ? errors[currentProps.name] : undefined;

          return (
            <>
              <div
                className={css({
                  display: "flex",
                  flexDirection: { base: "column", lg: "row" },
                  gap: "16px",
                  width: "100%",
                })}
              >
                <FormField
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  register={register}
                  error={errors.name}
                  className={css({
                    flex: 1,
                    width: "100%",
                  })}
                />
                <FormSelect
                  name="business_sectors"
                  options={controlOptions}
                  control={control}
                  error={errors.business_sectors}
                  className={css({
                    flex: 1,
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                  })}
                  placeholder="Select your business sector"
                />
              </div>

              <FormField
                name="companyName"
                type="text"
                placeholder="Enter your company name"
                register={register}
                error={errors.companyName}
              />
              <div>
                <div className={formLabel({ size: "lg" })}>Preferred contact</div>
                <div
                  className={css({
                    display: "flex",
                    flexDirection: { base: "column", md: "row" },
                    alignItems: {
                      base: "flex-start",
                      md: "center",
                    },
                    gap: "24px",
                    width: "100%",
                    justifyContent: { base: "center", md: "center" },
                  })}
                >
                  <FormRadioGroup
                    name="preferred_contact"
                    options={radioOptions}
                    control={control}
                    direction="horizontal"
                    size="lg"
                    error={errors.preferred_contact}
                    className={css({
                      flex: 1,
                      width: "100%",
                      justifyContent: { base: "flex-start", lg: "center" },
                    })}
                  />
                  <div className={css({ flex: 1, width: "100%" })}>
                    <FormField
                      name={currentProps?.name || "contact_info"}
                      type={currentProps?.type || "text"}
                      placeholder={currentProps?.placeholder}
                      register={register}
                      error={currentError}
                    />
                  </div>
                </div>
              </div>
              <FormField
                name="message"
                type="textarea"
                placeholder="Your Message:"
                register={register}
                error={errors.message}
                className={css({
                  flex: 1,
                  width: "100%",
                })}
              />
              <p
                className={css({
                  textStyle: "16_400_100",
                  color: "#1B2C38",
                })}
              >
                *Your message will be processed in accordance with our &nbsp;
                <span
                  className={css({
                    color: "#01B6CF",
                    cursor: "pointer",
                    textDecoration: "underline",
                  })}
                  onClick={() => setIsOpenPrivacy(true)}
                >
                  Privacy Policy
                </span>
              </p>
            </>
          );
        }}
      </ValidatedForm>
      <SuccessSubmitModal isOpen={isOpenSuccess} onClose={() => setIsOpenSuccess(false)} />
      <PrivacyModal isOpen={isOpenPrivacy} onClose={() => setIsOpenPrivacy(false)} />
    </>
  );
}

export default ContactForm;
