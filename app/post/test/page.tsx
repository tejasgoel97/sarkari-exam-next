// app/posts/[slug]/page.js (or wherever your component lives)

export default function BlogPost() {
  // 1. This is your HTML content (Data)
  const postContent = `
<div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #1e293b; line-height: 1.6; background-color: #f8fafc; padding: 15px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

  <header style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px dashed #cbd5e1;">
    <h1 style="color: rgb(37, 99, 235); font-size: 26px; margin: 0 0 10px 0; font-weight: 800; line-height: 1.3;">
      📢 BPSC Assistant Curator<br>Result 2025
    </h1>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
      <span style="background-color: rgb(37, 99, 235); color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">
        ✨ Revised List Out
      </span>
      <span style="background-color: #e2e8f0; color: #475569; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">
        📜 Advt No. 65/2020
      </span>
    </div>
    <p style="color: #64748b; font-size: 12px; margin-top: 12px;">
      🕒 Post Update: 24 December 2025
    </p>
  </header>

  <section style="background: white; border-left: 5px solid rgb(37, 99, 235); padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 25px;">
    <h3 style="color: rgb(37, 99, 235); margin-top: 0; font-size: 20px; display: flex; align-items: center;">
      <span style="margin-right: 8px;">🏛️</span> Short Information
    </h3>
    <p style="margin: 0; font-size: 15px; color: #334155;">
      <strong>Bihar Public Service Commission (BPSC)</strong> has officially released the <strong>Revised Result</strong> for the Assistant Curator, Research & Publication Officer, and Assistant Director recruitment. Candidates can now download the PDF to check their qualification status for the next stage.
    </p>
  </section>

  <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">
    
    <div style="flex: 1 1 300px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
      <div style="background-color: rgb(37, 99, 235); color: white; padding: 10px 15px; font-weight: bold; font-size: 16px; display: flex; align-items: center;">
        📅 Important Dates
      </div>
      <div style="padding: 15px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
          <span style="color: #64748b; font-size: 14px;">Result Released</span>
          <strong style="color: #0f172a; font-size: 14px;">23 Dec 2025 ✅</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
          <span style="color: #64748b; font-size: 14px;">Notification Year</span>
          <strong style="color: #0f172a; font-size: 14px;">2020</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b; font-size: 14px;">Next Stage</span>
          <strong style="color: rgb(37, 99, 235); font-size: 14px;">Notify Soon ⏳</strong>
        </div>
      </div>
    </div>

    <div style="flex: 1 1 300px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
      <div style="background-color: rgb(37, 99, 235); color: white; padding: 10px 15px; font-weight: bold; font-size: 16px; display: flex; align-items: center;">
        📝 Exam Details
      </div>
      <div style="padding: 15px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
          <span style="color: #64748b; font-size: 14px;">Authority</span>
          <strong style="color: #0f172a; font-size: 14px;">BPSC</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
          <span style="color: #64748b; font-size: 14px;">Type</span>
          <strong style="color: #0f172a; font-size: 14px;">Written (Objective)</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b; font-size: 14px;">Format</span>
          <strong style="color: rgb(37, 99, 235); font-size: 14px;">PDF List 📄</strong>
        </div>
      </div>
    </div>
  </div>

  <section style="margin-bottom: 30px;">
    <h3 style="color: rgb(37, 99, 235); margin-bottom: 15px; font-size: 18px; border-left: 4px solid rgb(37, 99, 235); padding-left: 10px;">
      📂 Vacancy & Result Status
    </h3>
    <div style="overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
      <table style="width: 100%; border-collapse: collapse; min-width: 500px; font-size: 14px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #475569;">
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Post Name</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Advt No.</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">Assistant Curator</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">65/2020</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; color: #166534; font-weight: bold;">Result Released</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">Research & Publication Officer</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">65/2020</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; color: #166534; font-weight: bold;">Result Released</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px;">Assistant Director</td>
            <td style="padding: 12px 15px;">65/2020</td>
            <td style="padding: 12px 15px; color: #166534; font-weight: bold;">Result Released</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section style="background-color: #eff6ff; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #bfdbfe;">
    <h3 style="color: rgb(37, 99, 235); margin-top: 0; font-size: 18px;">
      🔄 Selection Process
    </h3>
    <ul style="padding-left: 20px; margin: 10px 0; color: #334155; font-size: 15px;">
      <li style="margin-bottom: 8px;"><strong>Written Exam:</strong> Objective type (Result Declared).</li>
      <li style="margin-bottom: 8px;"><strong>Interview/Verification:</strong> Next stage for qualified candidates.</li>
      <li><strong>Final Merit:</strong> Based on cumulative performance.</li>
    </ul>
  </section>

  <section style="margin-bottom: 30px;">
    <h3 style="color: rgb(37, 99, 235); margin-bottom: 15px; font-size: 18px; border-left: 4px solid rgb(37, 99, 235); padding-left: 10px;">
      📲 How to Download Result
    </h3>
    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
      <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: flex-start;">
        <div style="background: rgb(37, 99, 235); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">1</div>
        <p style="margin: 0; font-size: 14px;">Visit official site: <strong>bpsc.bihar.gov.in</strong>.</p>
      </div>
      <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: flex-start;">
        <div style="background: rgb(37, 99, 235); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">2</div>
        <p style="margin: 0; font-size: 14px;">Click on <strong>"Advt. No. 65/2020 – Revised Result"</strong>.</p>
      </div>
      <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: flex-start;">
        <div style="background: rgb(37, 99, 235); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">3</div>
        <p style="margin: 0; font-size: 14px;">Open the PDF and press <strong>Ctrl+F</strong> to find your Roll Number.</p>
      </div>
      <div style="display: flex; gap: 15px; align-items: flex-start;">
        <div style="background: rgb(37, 99, 235); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">4</div>
        <p style="margin: 0; font-size: 14px;">Save the PDF for document verification. 💾</p>
      </div>
    </div>
  </section>

  <section style="margin-bottom: 30px;">
    <h3 style="color: rgb(37, 99, 235); margin-bottom: 15px; font-size: 18px; text-align: center;">
      ❓ Frequently Asked Questions
    </h3>
    <div style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
      
      <div style="padding: 15px; border-bottom: 1px solid #e2e8f0;">
        <p style="margin: 0 0 5px 0; font-weight: 600; color: #1e293b;">Q: When was the result released?</p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">Ans: The revised result was released on 23 December 2025.</p>
      </div>

      <div style="padding: 15px; border-bottom: 1px solid #e2e8f0;">
        <p style="margin: 0 0 5px 0; font-weight: 600; color: #1e293b;">Q: Is this the final selection?</p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">Ans: No, this is for the Written Exam. Qualified candidates move to the next stage.</p>
      </div>

      <div style="padding: 15px;">
        <p style="margin: 0 0 5px 0; font-weight: 600; color: #1e293b;">Q: What is the Advt No?</p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">Ans: 65/2020.</p>
      </div>
    </div>
  </section>

  <section style="margin-bottom: 20px;">
    <h3 style="color: rgb(37, 99, 235); text-align: center; margin-bottom: 20px; font-size: 20px;">
      🔗 Important Links
    </h3>
    <div style="display: flex; flex-direction: column; gap: 15px;">
      
      <a href="https://bpsc.bihar.gov.in/wp-content/uploads/BPSC_content/Notices/Results-Re-revised-652020-Asst.-Curator-Written_BPSC-20251223-p27aob.pdf" target="_blank" style="text-decoration: none;">
        <div style="background: rgb(37, 99, 235); color: white; padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
          <span style="font-weight: 600; font-size: 16px;">📥 Download Revised Result PDF</span>
          <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 4px; font-size: 12px;">Click Here ➜</span>
        </div>
      </a>

      <a href="https://bpsc.bihar.gov.in/" target="_blank" style="text-decoration: none;">
        <div style="background: #334155; color: white; padding: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
          <span style="font-weight: 600; font-size: 16px;">🌐 Official BPSC Website</span>
          <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 4px; font-size: 12px;">Visit Site ➜</span>
        </div>
      </a>

    </div>
  </section>

  <footer style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
    <p>Note: This result is provisional. Check official notifications for updates.</p>
  </footer>

</div>
`;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 2. THE STYLES (Injected directly into the component) */}

      {/* 3. The Content Rendered Here */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postContent }}
      />
    </div>
  );
}
