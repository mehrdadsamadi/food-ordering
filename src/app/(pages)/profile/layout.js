import UserTabs from "@/components/layout/UserTabs";

export default function ProfileLayout({children}) {

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs />

            <section className="max-w-2xl mx-auto mt-8">
                {children}
            </section>
        </section>
    )
}