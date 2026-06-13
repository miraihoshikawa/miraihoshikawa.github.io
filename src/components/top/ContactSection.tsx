import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading num="04" jp="連絡先" sub="研究・展示・実装に関するご相談を歓迎しています。お気軽にご連絡ください。">
        Contact
      </SectionHeading>
      <div className="space-y-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-mute)] uppercase">
          Email
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-block text-2xl font-bold text-[var(--text)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline md:text-3xl"
        >
          {profile.email}
        </a>
      </div>
    </SectionWrapper>
  );
}
