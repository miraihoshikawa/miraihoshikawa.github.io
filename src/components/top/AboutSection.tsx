/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading>About</SectionHeading>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex justify-center md:justify-start">
          <img
            src="/images/profile/portrait.jpeg"
            alt={profile.name}
            className="w-48 h-64 rounded object-cover brightness-90"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-[#e8e8e8]">{profile.name}</h3>
            <p className="text-sm text-[#5a5a5a]">{profile.nameEn}</p>
          </div>

          <p className="text-sm text-[#5a5a5acc]">{profile.university}</p>
          <ul className="space-y-1 text-sm text-[#5a5a5a]">
            {profile.labs.map((lab) => (
              <li key={lab}>- {lab}</li>
            ))}
          </ul>

          <div className="pt-2">
            <p className="text-xs font-semibold text-[#5a5a5a] uppercase tracking-wider">
              3つの活動軸
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {profile.axes.map((axis) => (
                <div key={axis.label} className="rounded border border-[#2a2a2a] p-3">
                  <p className="text-xs font-semibold text-[#e8e8e8]">{axis.label}</p>
                  <p className="mt-1 text-xs text-[#5a5a5a]">{axis.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-2 text-xs text-[#5a5a5a]">
            <span>出身: {profile.hometown}</span>
            <span>趣味: {profile.hobbies.join("、")}</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
