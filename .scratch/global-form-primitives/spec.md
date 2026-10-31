# Global Form Primitives Spec

Status: design specification, 2026-10-31; no form implementation or submission is claimed. [Design.md](../../Design.md) owns visual/accessibility baseline; [RFQ Field Definition](../rfq-system/Inquiry-Field-Definition.md) owns field rules and [RFQ Workflow](../rfq-system/Inquiry-Workflow.md) owns submit outcomes.

## Shared controls

Provide labelled text input, email input, select/radio group, textarea, file control, checkbox, submit button, inline error, form-level summary and result status. Persistent labels identify fields; required status is conveyed in text. Hints and units remain associated with controls. A conditional field is removed or clearly disabled according to the RFQ field contract and never submitted with stale hidden meaning.

Client validation assists the visitor; server validation is authoritative. Invalid input shows a field-specific message and form summary, moves focus predictably, and retains other values. Busy state prevents accidental duplicate submissions without falsely declaring success. Success is shown only after the RFQ engine confirms durable persistence and returns a reference; pending file checks are stated separately. A retry after uncertain network failure follows RFQ idempotency rather than creating a second inquiry.

## Upload, privacy and safety

The file control is available only to commercial inquiry types under RFQ limits and private scanning rules; it names selected files and errors accessibly. General contact has no attachment control. Privacy acknowledgment is unchecked until the buyer acts and links a real published notice; marketing opt-in is separate and optional only when approved copy exists. No form displays an unverified reply-time promise or sends private details through a URL.

## Responsive and acceptance

At narrow widths, fields stack in reading order and primary controls meet the approved 44 px preference. Verify keyboard and screen-reader labels, error association, focus order, retained values, disabled/busy states, file errors, network retry and 200% zoom with the implemented form. The RFQ acceptance criteria remain the executable verification plan; this document does not mark them passed.
