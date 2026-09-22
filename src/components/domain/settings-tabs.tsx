"use client";

import * as React from "react";
import { Bell, Building2, Trash2, User as UserIcon, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { roleLabels } from "@/lib/data/users";
import type { DemoUser } from "@/lib/types";

const TEAM = [
  { name: "Priya Andersson", role: "Ecosystem Director", email: "priya@harborview.example" },
  { name: "Devon Marsh", role: "Program Associate", email: "devon@harborview.example" },
  { name: "Yuki Tanaka", role: "Analyst", email: "yuki@harborview.example" },
];

export function SettingsTabs({ user }: { user: DemoUser }) {
  const { push } = useToast();

  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 max-w-lg">
            <div className="flex items-center gap-4">
              <Avatar name={user.name} size={56} />
              <div>
                <p className="font-medium">{user.name}</p>
                <Badge tone="brand">{roleLabels[user.role]}</Badge>
              </div>
            </div>
            <Field label="Full name" defaultValue={user.name} />
            <Field label="Title" defaultValue={user.title} />
            <Field label="Organization" defaultValue={user.orgName} />
            <Button
              onClick={() =>
                push({ tone: "success", title: "Profile saved", description: "(Demo action — not persisted.)" })
              }
            >
              Save changes
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-lg">
            {[
              { label: "New match suggestions", desc: "When a new high-scoring match appears" },
              { label: "Deal room activity", desc: "Document shares, NDA signatures, stage changes" },
              { label: "Event reminders", desc: "48 hours before events you're registered for" },
            ].map((n) => (
              <label key={n.label} className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-[var(--brand)]" />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <Bell className="h-3.5 w-3.5 text-muted" />
                    {n.label}
                  </span>
                  <span className="block text-xs text-muted">{n.desc}</span>
                </span>
              </label>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team" className="mt-6">
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {user.orgName}
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                push({ tone: "info", title: "Invite sent", description: "(Demo action — not persisted.)" })
              }
            >
              <UserPlus className="h-3.5 w-3.5" />
              Invite teammate
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {TEAM.map((member) => (
              <div key={member.email} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size={36} />
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted">{member.role} · {member.email}</p>
                  </div>
                </div>
                <button className="text-muted hover:text-danger" aria-label={`Remove ${member.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
        <UserIcon className="h-3 w-3" />
        {label}
      </label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}
