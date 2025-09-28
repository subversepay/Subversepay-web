import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import React from 'react'

function Customers() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="h-9 w-64 rounded-md bg-background/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Platform:</span>
                        <select className="h-9 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground">
                            <option>All Platforms</option>
                            <option>NetflixPro</option>
                            <option>DisneyPlus</option>
                            <option>HBO Max</option>
                            <option>Spotify</option>
                            <option>Amazon Prime</option>
                        </select>
                    </div>
                </div>

                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                </Button>
            </div>

            <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-brand-blue/20">
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Subscriptions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    MRR
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-blue/10">
                            {[
                                {
                                    name: "John Smith",
                                    email: "john.smith@example.com",
                                    subscriptions: 3,
                                    status: "Active",
                                    mrr: "$33.97",
                                },
                                {
                                    name: "Emma Johnson",
                                    email: "emma.j@example.com",
                                    subscriptions: 1,
                                    status: "Active",
                                    mrr: "$79.99",
                                },
                                {
                                    name: "Michael Brown",
                                    email: "michael.b@example.com",
                                    subscriptions: 2,
                                    status: "Active",
                                    mrr: "$24.98",
                                },
                                {
                                    name: "Sarah Wilson",
                                    email: "sarah.w@example.com",
                                    subscriptions: 1,
                                    status: "Active",
                                    mrr: "$16.99",
                                },
                                {
                                    name: "David Lee",
                                    email: "david.lee@example.com",
                                    subscriptions: 0,
                                    status: "Inactive",
                                    mrr: "$0.00",
                                },
                            ].map((customer, index) => (
                                <tr key={index} className="hover:bg-brand-blue/5">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                                                <span className="text-sm font-medium text-foreground">{customer.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-foreground">{customer.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                        {customer.subscriptions}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === "Active"
                                                    ? "bg-success/20 text-success"
                                                    : "bg-destructive/20 text-destructive"
                                                }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{customer.mrr}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-3 flex items-center justify-between border-t border-brand-blue/20">
                    <div className="text-sm text-muted-foreground">Showing 5 of 12,458 customers</div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-muted-foreground">
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-foreground">
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers