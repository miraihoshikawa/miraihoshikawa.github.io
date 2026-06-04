import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading>Contact</SectionHeading>
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm text-[#5a5a5a]">
          お問い合わせはメールにてお気軽にご連絡ください。
        </p>
        <a
          href="mailto:example@example.com"
          className="mt-4 inline-block rounded border border-[#2a2a2a] px-6 py-2 text-sm text-[#5a5a5a] transition-colors hover:border-[#2a5aaa] hover:text-[#2a5aaa]"
        >
          メールを送る
        </a>
      </div>
    </SectionWrapper>
  );
}
