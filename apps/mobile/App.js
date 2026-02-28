// React Native + Expo Mobile App
// Feature 10: 4 screens - Dashboard, Projects, Chat, Settings

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

// Dashboard Screen
function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back!</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard title="Projects" value="12" icon="📁" />
        <StatCard title="Deployments" value="47" icon="🚀" />
        <StatCard title="Tokens" value="854K" icon="🎯" />
        <StatCard title="Team" value="8" icon="👥" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <ActivityItem 
          icon="🚀"
          title="Deployed to production"
          subtitle="E-commerce Store"
          time="2 min ago"
        />
        <ActivityItem 
          icon="📁"
          title="Created new project"
          subtitle="Blog Platform"
          time="1 hour ago"
        />
        <ActivityItem 
          icon="💻"
          title="Code pushed to GitHub"
          subtitle="Dashboard App"
          time="3 hours ago"
        />
      </View>
    </ScrollView>
  );
}

// Projects Screen
function ProjectsScreen() {
  const projects = [
    { id: 1, name: 'E-commerce Store', status: 'active', deployments: 12 },
    { id: 2, name: 'Blog Platform', status: 'active', deployments: 8 },
    { id: 3, name: 'SaaS Dashboard', status: 'deploying', deployments: 5 },
    { id: 4, name: 'Social Network', status: 'active', deployments: 15 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ New Project</Text>
        </TouchableOpacity>
      </View>

      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ScrollView>
  );
}

// Chat Screen (Real-time interface)
function ChatScreen() {
  const messages = [
    { id: 1, type: 'user', text: 'Create a new e-commerce website with a shopping cart', time: '10:32 AM' },
    { id: 2, type: 'agent', text: 'I\'ll help you build that! I\'m starting with the Designer agent to create a design system...', time: '10:33 AM' },
    { id: 3, type: 'agent', text: '✓ Design system created\n✓ Components generated\n✓ Code scaffolded\n\nYour project is ready for deployment!', time: '10:35 AM' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Chat</Text>
        <Text style={styles.headerSubtitle}>Multi-agent assistant</Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ScrollView>

      <View style={styles.chatInput}>
        <Text style={styles.inputPlaceholder}>Type your message...</Text>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Settings Screen
function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem title="Profile" value="Edit" />
        <SettingItem title="Email" value="user@example.com" />
        <SettingItem title="Subscription" value="Pro Plan" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrations</Text>
        <SettingItem title="GitHub" value="Connected" />
        <SettingItem title="Vercel" value="Connected" />
        <SettingItem title="Stripe" value="Active" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingItem title="Notifications" value="Enabled" />
        <SettingItem title="Theme" value="Light" />
        <SettingItem title="Language" value="English" />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Main App with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            tabBarIcon: () => <Text style={styles.tabIcon}>📊</Text>
          }}
        />
        <Tab.Screen 
          name="Projects" 
          component={ProjectsScreen}
          options={{
            tabBarIcon: () => <Text style={styles.tabIcon}>📁</Text>
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{
            tabBarIcon: () => <Text style={styles.tabIcon}>💬</Text>
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarIcon: () => <Text style={styles.tabIcon}>⚙️</Text>
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Component: Stat Card
function StatCard({ title, value, icon }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

// Component: Activity Item
function ActivityItem({ icon, title, subtitle, time }) {
  return (
    <View style={styles.activityItem}>
      <Text style={styles.activityIcon}>{icon}</Text>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );
}

// Component: Project Card
function ProjectCard({ project }) {
  const statusColors = {
    active: '#10B981',
    deploying: '#F59E0B',
    archived: '#6B7280'
  };

  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{project.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[project.status] }]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      <Text style={styles.projectInfo}>{project.deployments} deployments</Text>
      <TouchableOpacity style={styles.projectButton}>
        <Text style={styles.projectButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component: Chat Message
function ChatMessage({ message }) {
  const isUser = message.type === 'user';
  return (
    <View style={[styles.chatMessage, isUser ? styles.userMessage : styles.agentMessage]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>{message.time}</Text>
    </View>
  );
}

// Component: Setting Item
function SettingItem({ title, value }) {
  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  projectInfo: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  projectButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 8,
  },
  projectButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatMessage: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
  },
  agentMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#111827',
  },
  messageTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  chatInput: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  inputPlaceholder: {
    flex: 1,
    color: '#9CA3AF',
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  tabIcon: {
    fontSize: 24,
  },
});
