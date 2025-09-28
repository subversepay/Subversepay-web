import { Button } from "@/components/ui/button"

export default function Settings(){
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                        <h2 className="text-lg font-medium text-foreground mb-4">Account Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground"
                                    defaultValue={"StreamFlix Media"}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground"
                                    defaultValue={"admin@streamflix.com"}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">Default Stablecoin</label>
                                    <select className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground">
                                        <option>USDC</option>
                                        <option>USDT</option>
                                        <option>DAI</option>
                                        <option>BUSD</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">Auto-Renewal</label>
                                    <select className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground">
                                        <option>Enabled</option>
                                        <option>Disabled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-background/60 h-4 w-4"
                                        defaultChecked
                                    />
                                    <span className="text-sm text-foreground">
                                        Receive email notifications for subscription renewals
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-brand-blue/20">
                                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-foreground">Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                        <h2 className="text-lg font-medium text-foreground mb-4">Security</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">Change Password</label>
                                <input
                                    type="password"
                                    className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground mb-2"
                                    placeholder="Current password"
                                />
                                <input
                                    type="password"
                                    className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground mb-2"
                                    placeholder="New password"
                                />
                                <input
                                    type="password"
                                    className="w-full h-10 rounded-md bg-background/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-background/60 h-4 w-4"
                                        defaultChecked
                                    />
                                    <span className="text-sm text-foreground">Enable two-factor authentication</span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-brand-blue/20">
                                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-foreground w-full">
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                <h2 className="text-lg font-medium text-foreground mb-4">API Integration</h2>

                <div className="space-y-4 mb-6">
                    <div className="bg-background/60 border border-brand-blue/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-foreground font-medium">Production API Key</div>
                            <div className="text-xs text-muted-foreground">Created: Apr 12, 2025</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 h-9 rounded-md bg-background/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-muted-foreground"
                                value="sp_live_••••••••••••••••••••••••••••••"
                                readOnly
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                            >
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                            >
                                Regenerate
                            </Button>
                        </div>
                    </div>

                    <div className="bg-background/60 border border-brand-blue/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-foreground font-medium">Test API Key</div>
                            <div className="text-xs text-muted-foreground">Created: Apr 12, 2025</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 h-9 rounded-md bg-background/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-muted-foreground"
                                value="sp_test_••••••••••••••••••••••••••••••"
                                readOnly
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                            >
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                            >
                                Regenerate
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-muted-foreground">
                    API keys provide access to your OTT platform integrations. Keep them secure and never share them
                    in public areas such as GitHub or client-side code.
                </div>
            </div>
        </div>
    )
}

