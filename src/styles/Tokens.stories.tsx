import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * `_tokens.scss`에 정의한 디자인 토큰을 눈으로 확인하는 문서입니다.
 * 값은 CSS 변수를 그대로 읽어 오므로, 토큰을 고치면 이 화면도 함께 바뀝니다.
 */
const meta = {
  title: "디자인 기초/토큰",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COLOR_GROUPS = [
  {
    title: "배경",
    tokens: ["--color-bg", "--color-surface", "--color-bg-subtle", "--color-surface-warm", "--color-bg-dark"],
  },
  {
    title: "브랜드",
    tokens: ["--color-primary", "--color-primary-hover", "--color-primary-pressed", "--color-primary-soft", "--color-accent"],
  },
  {
    title: "글자",
    tokens: ["--color-text-strong", "--color-text", "--color-text-muted", "--color-text-subtle"],
  },
  {
    title: "상태 · 선",
    tokens: ["--color-focus", "--color-error", "--color-border", "--color-line"],
  },
];

const SPACES = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96];

const heading = { margin: "32px 0 12px", fontSize: 14, fontWeight: 600 };
const caption = { fontSize: 12, color: "var(--color-text-muted)" };

export const Colors: Story = {
  name: "색",
  render: () => (
    <div>
      {COLOR_GROUPS.map((group) => (
        <section key={group.title}>
          <h3 style={heading}>{group.title}</h3>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {group.tokens.map((token) => (
              <li key={token} style={{ width: 150 }}>
                <div
                  style={{
                    height: 64,
                    border: "1px solid var(--color-line)",
                    borderRadius: 4,
                    background: `var(${token})`,
                  }}
                />
                <code style={caption}>{token}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  name: "간격",
  render: () => (
    <ul style={{ display: "grid", gap: 12 }}>
      {SPACES.map((size) => (
        <li key={size} style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <code style={{ ...caption, width: 90 }}>--space-{size}</code>
          <div
            style={{
              width: `var(--space-${size})`,
              height: 16,
              background: "var(--color-primary)",
            }}
          />
        </li>
      ))}
    </ul>
  ),
};

export const Typography: Story = {
  name: "글꼴",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <p style={caption}>본문 — Pretendard (--font-base)</p>
        <p style={{ fontSize: 28, fontWeight: 600, color: "var(--color-text-strong)" }}>
          피부의 본질을 살피고 필요한 치료만 정확하게
        </p>
      </div>
      <div>
        <p style={caption}>숫자 · 영문 제목 — Bebas Neue (--font-display)</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1, color: "var(--color-primary)" }}>
          ONGYEOL 2010
        </p>
      </div>
    </div>
  ),
};
