export const getCaseAssistConfigurationInitialState =
  (): CaseAssistConfigurationState => ({
    caseAssistId: '',
    locale: 'en-US',
  });

export interface CaseAssistConfigurationState {
  /**
   * The unique identifier of the target case assist configuration. See [Retrieving a Case Assist ID](https://docs.coveo.com/en/3328/service/manage-case-assist-configurations#retrieving-a-case-assist-id).
   */
  caseAssistId: string;
  /**
   * The locale of the current user. Must comply with IETF’s BCP 47 definition: https://www.rfc-editor.org/rfc/bcp/bcp47.txt.
   */
  locale?: string;
  /**
   * The base URL to use to proxy Coveo case assist requests (e.g., `https://example.com/search`).
   *
   * This is an advanced option that you should only set if you need to proxy Coveo case assist through your own
   * server. In most cases, you should not set this option.
   *
   * By default, no proxy is used and the Coveo case assist requests are sent directly to the Coveo platform through the
   * [organization endpoint](https://docs.coveo.com/en/mcc80216) resolved from the `organizationId` and
   * `environment` values provided in your engine configuration (i.e., `https://<organizationId>.org.coveo.com` or
   * `https://<organizationId>.org<environment>.coveo.com`, if the `environment` values is specified and different from
   * `prod`).
   *
   * If you set this option, you must also implement the following proxy endpoints on your server, otherwise the case assist
   * engine will not work properly:
   *
   * - `POST` `/classify` to proxy requests to [`POST` `https://<organizationId>.org<environment|>.coveo.com/rest/organizations/<organizationId>/caseassists/<caseAssistId>/classify`](https://docs.coveo.com/en/3430/api-reference/customer-service-api#tag/Case-Assist/operation/postClassify)
   * - `POST` `/documents/suggest` to proxy requests to [`POST` `https://<organizationId>.org<environment|>.coveo.com/rest/organizations/<organizationId>/caseassists/<caseAssistId>/documents/suggest`](https://docs.coveo.com/en/3430/api-reference/customer-service-api#tag/Case-Assist/operation/getSuggestDocument)
   */
  apiBaseUrl?: string;
}
