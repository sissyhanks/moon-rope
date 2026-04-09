export const ui = {
  layout: {
    page: "mx-auto max-w-md p-6",
    card: "rounded-3xl p-6",
    form: "grid gap-4",
    formWithTopSpacing: "mt-6 grid gap-4",
    field: "",
  },

  text: {
    heading: "text-3xl font-semibold text-stone-100",
    pageTitle: "text-2xl font-semibold text-stone-200",
    subtitle: "mt-2 text-sm text-stone-300",
    label: "text-sm font-medium text-stone-400",
    status: "text-sm text-stone-300",
    moonIn: "text-sm font-medium text-stone-400",
    date: "mt-1 text-sm text-stone-200",
    signup:
      "text-sm font-medium text-stone-200 underline-offset-4 hover:underline",
  },

  input: {
    base: "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
    text: "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
    textarea:
      "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
  },

  button: {
    primary: "rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white",
  },

  panel: {
    item: "rounded-2xl px-4 py-4",
    itemTitle: "text-sm font-medium text-stone-200",
    itemText: "mt-1 text-sm text-stone-300",
    itemLabel: "font-medium text-stone-200",
    list: "mt-6 space-y-4",
    empty: "mt-6 text-sm text-stone-300",
  },

  header: {
    layout: {
      page: "mx-auto max-w-md px-4 py-6",
      card: "rounded-3xl p-6",
      headerRow: "mt-4 flex items-start justify-between",
      form: "grid gap-4",
      formWithTopSpacing: "mt-6 grid gap-4",
      field: "",
    },

    text: {
      heading:
        "block w-full max-w-xs sm:max-w-sm md:max-w-md text-left text-6xl uppercase",
      pageTitle: "text-2xl font-semibold text-stone-200",
      subtitle: "mt-2 text-sm text-stone-300",
      label: "text-sm font-medium text-stone-400",
      status: "text-sm text-stone-300",
      moonIn: "text-sm font-medium leading-none text-stone-200",
      date: "mt-1 text-sm leading-none text-stone-400",
      signup:
        "text-sm font-medium leading-none text-stone-200 underline-offset-4 hover:underline",
    },

    input: {
      base: "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
      text: "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
      textarea:
        "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm",
    },

    button: {
      primary:
        "rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white",
    },
  },
} as const;
