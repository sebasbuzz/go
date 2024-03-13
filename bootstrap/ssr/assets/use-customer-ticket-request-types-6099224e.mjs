import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { d as apiClient } from "../server-entry.mjs";
function SectionHelper({
  title,
  description,
  actions,
  color = "primary",
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "p-10 rounded",
        color === "positive" && "bg-positive/focus border-l-positive border-l-4",
        color === "warning" && "bg-warning/focus border-l-warning border-l-4",
        color === "danger" && "bg-danger/focus border-l-danger border-l-4",
        color === "primary" && "bg-primary/focus border-l-primary border-l-4",
        color === "neutral" && "bg-paper border"
      ),
      children: [
        title && /* @__PURE__ */ jsx("div", { className: "text-sm mb-4 font-medium", children: title }),
        description && /* @__PURE__ */ jsx("div", { className: "text-sm", children: description }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-14", children: actions })
      ]
    }
  );
}
function useCustomerTicketRequestTypes() {
  return useQuery({
    queryKey: ["new-ticket-request-type"],
    queryFn: () => fetchRequestTypes()
  });
}
function fetchRequestTypes() {
  return apiClient.get(`ticket-request-type`, {
    params: {
      perPage: 25,
      with: "",
      orderBy: "name",
      orderDir: "asc",
      filterByPurchases: false,
      paginate: "simple"
    }
  }).then((response) => response.data);
}
export {
  SectionHelper as S,
  useCustomerTicketRequestTypes as u
};
//# sourceMappingURL=use-customer-ticket-request-types-6099224e.mjs.map
