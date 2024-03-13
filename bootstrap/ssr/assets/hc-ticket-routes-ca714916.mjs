import { jsxs, jsx } from "react/jsx-runtime";
import { useParams, useRoutes } from "react-router-dom";
import { K as queryClient, M as toast, O as message, s as showHttpErrorToast, d as apiClient, b as useNavigate, N as Navbar, H as HcSearchBar, B as Breadcrumb, c as BreadcrumbItem, T as Trans, an as useTicket, U as useKeybind, ag as FileUploadProvider, k as PageStatus, E as FormattedRelativeTime, ad as FormattedDate, G as Chip, e as Button, Z as DialogTrigger, f as CheckIcon, a5 as ConfirmationDialog, a as useSettings, r as useSearchArticles, A as ArticleLink, q as useSearchTermLogger, aw as getInputFieldClassNames, ap as Form, ay as FormSelect, Y as Item, ax as FormTextField, bL as CustomerTicketListPage, z as NotFoundPage } from "../server-entry.mjs";
import { useState, Fragment, useRef } from "react";
import { S as SendReplyButton, T as TicketTypeRequestTag, b as useTicketReplies, c as TicketReplyLayout, I as InfiniteScrollSentinel, u as useChangeTicketStatus, i as useCreateTicket } from "./use-create-ticket-57a7a1a3.mjs";
import { R as ReplyEditor, A as AttachmentListLayout, F as FileEntryAttachmentLayout, h as useCurrentDateTime, s as AccordionAnimation, g as getReplyBody } from "./reply-editor-11bd64f3.mjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { R as ReplyIcon } from "./Reply-c6ddbdbb.mjs";
import { S as SectionHelper, u as useCustomerTicketRequestTypes } from "./use-customer-ticket-request-types-6099224e.mjs";
import { useForm } from "react-hook-form";
import { AnimatePresence, m } from "framer-motion";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
import "@react-aria/utils";
import "clsx";
import "nano-memoize";
import "@internationalized/number";
import "@internationalized/date";
import "zustand";
import "zustand/middleware/immer";
import "nanoid";
import "immer";
import "@react-stately/utils";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@react-aria/focus";
import "react-dom";
import "@react-aria/ssr";
import "deepmerge";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
import "slugify";
import "@react-aria/interactions";
import "just-debounce-it";
import "./dashboard-sidenav-e2d65f25.mjs";
function useSubmitCustomerReply() {
  const { ticketId } = useParams();
  return useMutation({
    mutationFn: (payload) => submitReply({
      ticketId,
      ...payload
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Reply submitted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function submitReply(data) {
  var _a;
  const payload = {
    body: data.body,
    attachments: (_a = data.attachments) == null ? void 0 : _a.map((a) => a.id)
  };
  return apiClient.post(`tickets/${data.ticketId}/replies`, payload).then((r) => r.data);
}
function useTeam(id) {
  return useQuery({
    queryKey: ["new-team", id],
    queryFn: () => fetchTeam(id)
  });
}
function fetchTeam(id) {
  return apiClient.get(`teams/${id}`).then((response) => response.data);
}
const TicketHeaderDateFormat = {
  month: "short",
  day: "numeric"
};
function CustomerTicketPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-12 pb-48 md:px-24", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-34 mt-34 md:mb-48", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc/tickets`), children: /* @__PURE__ */ jsx(Trans, { message: "Requests" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "Current ticket" }) })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Content, {}) })
    ] })
  ] });
}
function Content() {
  const query = useTicket();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  useKeybind("window", "r", () => setEditorIsOpen(true));
  return /* @__PURE__ */ jsx(Fragment, { children: query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    query.data.ticket.status === "locked" && /* @__PURE__ */ jsx(
      SectionHelper,
      {
        className: "mb-44 text-center",
        color: "danger",
        title: /* @__PURE__ */ jsx(Trans, { message: "This ticket was locked due to inactivity. To reply, create a new ticket." })
      }
    ),
    /* @__PURE__ */ jsx(
      Header,
      {
        ticket: query.data.ticket,
        editorIsOpen,
        onOpenEditor: () => setEditorIsOpen(true)
      }
    ),
    /* @__PURE__ */ jsx(FileUploadProvider, { children: editorIsOpen && /* @__PURE__ */ jsx(CustomerReplyEditor, { onClose: () => setEditorIsOpen(false) }) }),
    /* @__PURE__ */ jsx(ReplyList, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" }) });
}
function CustomerReplyEditor({ onClose }) {
  const editorRef = useRef(null);
  const submitReply2 = useSubmitCustomerReply();
  const [attachments, setAttachments] = useState([]);
  return /* @__PURE__ */ jsx(
    ReplyEditor,
    {
      isLoading: submitReply2.isPending,
      footerButtons: /* @__PURE__ */ jsx(SendReplyButton, {}),
      editorRef,
      className: "mb-24",
      attachments,
      onAttachmentsChange: (attachments2) => setAttachments(attachments2),
      onSubmit: (reply) => submitReply2.mutate(reply, {
        onSuccess: () => onClose()
      })
    }
  );
}
function Header({ ticket, onOpenEditor, editorIsOpen }) {
  var _a, _b;
  const { assignee } = ticket;
  const teamId = assignee == null ? void 0 : assignee.team_id;
  const assignedTeam = useTeam(teamId);
  return /* @__PURE__ */ jsxs("div", { className: "mb-44", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap text-muted max-md:hidden", children: [
        /* @__PURE__ */ jsx(FormattedRelativeTime, { date: ticket.created_at }),
        " (",
        /* @__PURE__ */ jsx(
          FormattedDate,
          {
            date: ticket.created_at,
            options: TicketHeaderDateFormat
          }
        ),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-2xl md:ml-auto", children: [
        "#",
        ticket.id
      ] }),
      /* @__PURE__ */ jsx(
        Chip,
        {
          size: "sm",
          color: !ticket.closed_at ? "primary" : void 0,
          radius: "rounded",
          className: "min-w-60 font-bold capitalize",
          children: ticket.status
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "my-12 text-2xl", children: ticket.subject }),
      /* @__PURE__ */ jsx(TicketTypeRequestTag, { ticketRequestType: ticket.ticket_request_type })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "mr-auto font-semibold max-md:hidden flex gap-4 items-center", children: teamId && assignedTeam && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Assigned to:" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: (_b = (_a = assignedTeam == null ? void 0 : assignedTeam.data) == null ? void 0 : _a.team) == null ? void 0 : _b.display_name })
      ] }) }),
      !ticket.closed_at && /* @__PURE__ */ jsx(MarkAsSolvedButton, {}),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          startIcon: /* @__PURE__ */ jsx(ReplyIcon, {}),
          disabled: editorIsOpen,
          onClick: () => onOpenEditor(),
          children: /* @__PURE__ */ jsx(Trans, { message: "Add a reply" })
        }
      )
    ] })
  ] });
}
function ReplyList({ data: { ticket, replies } }) {
  const query = useTicketReplies(ticket.id, replies);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    query.items.map((reply) => {
      var _a, _b;
      const isInitial = !query.hasNextPage && reply.id === ((_a = query.items.at(-1)) == null ? void 0 : _a.id);
      return /* @__PURE__ */ jsx(
        TicketReplyLayout,
        {
          className: "px-12",
          reply,
          isInitial,
          ticketRequestType: ticket.ticket_request_type,
          attachments: ((_b = reply.attachments) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx(AttachmentList, { attachments: reply.attachments }) : null
        },
        reply.id
      );
    }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function AttachmentList({ attachments }) {
  return /* @__PURE__ */ jsx(AttachmentListLayout, { className: "mt-30 w-max", children: attachments.map((attachment, index) => /* @__PURE__ */ jsx(
    FileEntryAttachmentLayout,
    {
      attachments,
      index
    },
    attachment.id
  )) });
}
function MarkAsSolvedButton() {
  const changeStatus = useChangeTicketStatus();
  const { ticketId } = useParams();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", startIcon: /* @__PURE__ */ jsx(CheckIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Mark as solved" }) }),
    ({ close }) => /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        onConfirm: () => {
          changeStatus.mutate(
            {
              ids: [ticketId],
              status: "closed"
            },
            {
              onSuccess: () => {
                close();
                toast(message("Ticked marked as solved"));
                navigate(`/hc/tickets`);
              }
            }
          );
        },
        isLoading: changeStatus.isPending,
        title: /* @__PURE__ */ jsx(Trans, { message: "Mark as solved" }),
        body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to mark this ticket as solved?" }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
      }
    )
  ] });
}
function useCustomerTicketCategories() {
  return useQuery({
    queryKey: ["new-ticket-categories"],
    queryFn: () => fetchCategories()
  });
}
function fetchCategories() {
  return apiClient.get(`ticket-categories`, {
    params: {
      perPage: 25,
      with: "categories",
      orderBy: "name",
      orderDir: "asc",
      filterByPurchases: true,
      paginate: "simple"
    }
  }).then((response) => response.data);
}
function useCustomerNewTicketConfig() {
  var _a, _b;
  const settings = useSettings();
  return ((_b = (_a = settings.hc) == null ? void 0 : _a.newTicket) == null ? void 0 : _b.appearance) || {};
}
function SuggestedArticlesDrawer({
  query,
  suggestionLog,
  hcCategoryIds
}) {
  const now = useCurrentDateTime();
  const handleSearch = (r) => {
    if (r.pagination.data.length) {
      suggestionLog.current.push({
        term: r.query,
        results: r.pagination.data.map((a) => a.id),
        date: now.toAbsoluteString()
      });
    }
  };
  const { data } = useSearchArticles(
    query,
    { perPage: 5, categoryIds: hcCategoryIds },
    { onSearch: handleSearch }
  );
  const results = data == null ? void 0 : data.pagination.data;
  const isVisible = !!(results == null ? void 0 : results.length);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
    m.div,
    {
      variants: AccordionAnimation.variants,
      transition: AccordionAnimation.transition,
      initial: false,
      animate: isVisible ? "open" : "closed",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 mt-24 text-xl font-semibold", children: [
          /* @__PURE__ */ jsx(Trans, { message: "Were you looking for" }),
          ":"
        ] }),
        results == null ? void 0 : results.map((article) => /* @__PURE__ */ jsx(
          ArticleLink,
          {
            article,
            className: "block py-10 text-sm text-primary",
            target: "_blank"
          },
          article.id
        ))
      ]
    },
    "drawer"
  ) });
}
function CustomerNewTicketPage() {
  const navigate = useNavigate();
  const config = useCustomerNewTicketConfig();
  const query = useCustomerTicketCategories();
  const queryRequestType = useCustomerTicketRequestTypes();
  const { envato } = useSettings();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-12 pb-48 md:px-24", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-34 mt-34 md:mb-48", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc/tickets`), children: /* @__PURE__ */ jsx(Trans, { message: "Requests" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "New request" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-44", children: [
        /* @__PURE__ */ jsxs("main", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-34 mt-14 text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: config.title }) }),
          query.error && envato.enable && envato.require_purchase_code && /* @__PURE__ */ jsx(EnvatoError, {}),
          query.data && queryRequestType.data ? /* @__PURE__ */ jsx(
            TicketForm,
            {
              ticketCategories: query.data.pagination.data,
              ticketRequestTypes: queryRequestType.data.pagination.data
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsx(Sidebar, {})
      ] })
    ] })
  ] });
}
function TicketForm({ ticketCategories, ticketRequestTypes }) {
  var _a, _b, _c, _d;
  console.log("ticketCategories", ticketCategories);
  const config = useCustomerNewTicketConfig();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      category_id: (_a = ticketCategories[0]) == null ? void 0 : _a.id,
      ticket_request_type: (_b = ticketRequestTypes[0]) == null ? void 0 : _b.id
    }
  });
  const bodyError = (_c = form.formState.errors.body) == null ? void 0 : _c.message;
  const createTicket = useCreateTicket(form);
  const editorRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const searchQuery = form.watch("subject");
  const hcCategoryIds = (_d = ticketCategories.find((tc) => form.watch("category_id") == tc.id)) == null ? void 0 : _d.categories.map((hc) => hc.id);
  const searchTermLogger = useSearchTermLogger();
  const suggestionLog = useRef([]);
  const selectedCategoryId = form.watch("category_id");
  const selectedCategory = ticketCategories.find(
    (c) => c.id == selectedCategoryId
  );
  const types = selectedCategory == null ? void 0 : selectedCategory.ticket_request_type;
  const handleSubmit = () => {
    console.log("form.getValues()", form.getValues());
    createTicket.mutate(
      {
        ...form.getValues(),
        body: getReplyBody(editorRef) || "",
        attachments: attachments.map((a) => a.id),
        suggestionLog: suggestionLog.current
      },
      {
        onSuccess: () => {
          searchTermLogger.updateLastSearch({ createdTicket: true });
          navigate("/hc/tickets");
        }
      }
    );
  };
  const inputFieldClassNames = getInputFieldClassNames();
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: () => handleSubmit(),
      onBeforeSubmit: () => form.clearErrors(),
      children: [
        /* @__PURE__ */ jsx(
          FormSelect,
          {
            name: "category_id",
            label: /* @__PURE__ */ jsx(Trans, { message: config.categoryLabel }),
            selectionMode: "single",
            className: "mb-24",
            errorMessage: selectedCategory && selectedCategory.support_expired && /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Your support for this item has expired. <a>Click here to renew</a>",
                values: {
                  a: (content) => /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://codecanyon.net/downloads",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "font-bold underline",
                      children: content
                    }
                  )
                }
              }
            ),
            children: ticketCategories.map((category) => /* @__PURE__ */ jsx(Item, { value: category.id, children: category.display_name || category.name }, category.id))
          }
        ),
        (types == null ? void 0 : types.length) > 0 && /* @__PURE__ */ jsx(
          FormSelect,
          {
            name: "ticket_request_type",
            label: /* @__PURE__ */ jsx(Trans, { message: "Request Type" }),
            selectionMode: "single",
            className: "mb-24",
            children: types.map((request_type) => /* @__PURE__ */ jsx(Item, { value: request_type.id, children: request_type.display_name || request_type.name }, request_type.id))
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "subject",
            label: /* @__PURE__ */ jsx(Trans, { message: config.subjectLabel })
          }
        ),
        /* @__PURE__ */ jsx(
          SuggestedArticlesDrawer,
          {
            query: searchQuery,
            suggestionLog,
            hcCategoryIds
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "my-24", children: [
          /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.label, children: /* @__PURE__ */ jsx(Trans, { message: config.descriptionLabel }) }),
          (selectedCategory == null ? void 0 : selectedCategory.description_ticket_page) && /* @__PURE__ */ jsx("div", { className: `[&_a]:underline ${inputFieldClassNames.label}`, children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: selectedCategory.description_ticket_page } }) }),
          /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
            ReplyEditor,
            {
              autoFocus: false,
              minHeight: "min-h-[300px]",
              isLoading: createTicket.isPending,
              editorRef,
              attachments,
              onAttachmentsChange: (attachments2) => setAttachments(attachments2),
              onSubmit: () => handleSubmit()
            }
          ) }),
          bodyError && /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.error, children: bodyError })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            type: "submit",
            disabled: createTicket.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: config.submitButtonText })
          }
        )
      ]
    }
  );
}
function Sidebar() {
  var _a;
  const config = useCustomerNewTicketConfig();
  return /* @__PURE__ */ jsxs("aside", { className: "w-500 border-l px-40 max-md:hidden", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-34 text-xl font-medium", children: /* @__PURE__ */ jsx(Trans, { message: config.sidebarTitle }) }),
    (_a = config.sidebarTips) == null ? void 0 : _a.map((tip, index) => /* @__PURE__ */ jsx(SidebarTip, { title: /* @__PURE__ */ jsx(Trans, { message: tip.title }), children: /* @__PURE__ */ jsx(Trans, { message: tip.content }) }, index))
  ] });
}
function SidebarTip({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-30", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: title }),
    /* @__PURE__ */ jsx("p", { children })
  ] });
}
function EnvatoError() {
  return /* @__PURE__ */ jsx("div", { className: "text-sm text-danger", children: /* @__PURE__ */ jsx(Trans, { message: "There was an issue fetching your purchase codes from envato. Try to logout and use 'login with envato' button." }) });
}
const RouteConfig = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(CustomerTicketListPage, {})
  },
  {
    path: "/new",
    element: /* @__PURE__ */ jsx(CustomerNewTicketPage, {})
  },
  {
    path: ":ticketId",
    element: /* @__PURE__ */ jsx(CustomerTicketPage, {})
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(NotFoundPage, {})
  }
];
function HcTicketRoutes() {
  return useRoutes(RouteConfig);
}
export {
  HcTicketRoutes as default
};
//# sourceMappingURL=hc-ticket-routes-ca714916.mjs.map
