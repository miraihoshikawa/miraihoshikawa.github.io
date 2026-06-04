import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading>Contact</SectionHeading>
      <div className="max-w-2xl">
        <p className="text-base leading-loose text-[var(--text-sub)]">
          お問い合わせ・ご依頼はメールにてお気軽にご連絡ください。
          研究・展示・実装に関するご相談を歓迎しています。
        </p>
        <div className="mt-10 space-y-2">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-mute)] uppercase">
            Email
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="text-lg font-bold text-[var(--text)] underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
