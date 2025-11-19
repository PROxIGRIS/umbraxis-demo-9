export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      banner_content: {
        Row: {
          button_enabled: boolean | null
          button_link: string | null
          button_text: string | null
          countdown_enabled: boolean | null
          countdown_end_at: string | null
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          lottie_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          button_enabled?: boolean | null
          button_link?: string | null
          button_text?: string | null
          countdown_enabled?: boolean | null
          countdown_end_at?: string | null
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          lottie_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          button_enabled?: boolean | null
          button_link?: string | null
          button_text?: string | null
          countdown_enabled?: boolean | null
          countdown_end_at?: string | null
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          lottie_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string | null
          id: string
          status: string
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string | null
          id?: string
          status?: string
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string | null
          id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "online_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_locations: {
        Row: {
          created_at: string | null
          driver_id: string | null
          id: string
          latitude: number
          longitude: number
          timestamp: string | null
        }
        Insert: {
          created_at?: string | null
          driver_id?: string | null
          id?: string
          latitude: number
          longitude: number
          timestamp?: string | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string | null
          id?: string
          latitude?: number
          longitude?: number
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_locations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          active: boolean | null
          assigned_route: Json | null
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
          phone: string | null
          serial_number: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          assigned_route?: Json | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          password_hash: string
          phone?: string | null
          serial_number: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          assigned_route?: Json | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
          phone?: string | null
          serial_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      online_classes: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          max_students: number | null
          meeting_link: string | null
          scheduled_at: string
          status: string
          subject: string
          title: string
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          max_students?: number | null
          meeting_link?: string | null
          scheduled_at: string
          status?: string
          subject: string
          title: string
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          max_students?: number | null
          meeting_link?: string | null
          scheduled_at?: string
          status?: string
          subject?: string
          title?: string
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "online_classes_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          role: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      themes: {
        Row: {
          accent_color: string
          created_at: string | null
          description: string
          display_name: string
          id: string
          is_premium: boolean | null
          name: string
          preview_image: string | null
          primary_color: string
          secondary_color: string
          unlock_requirement: string
          unlock_value: number
        }
        Insert: {
          accent_color: string
          created_at?: string | null
          description: string
          display_name: string
          id?: string
          is_premium?: boolean | null
          name: string
          preview_image?: string | null
          primary_color: string
          secondary_color: string
          unlock_requirement: string
          unlock_value: number
        }
        Update: {
          accent_color?: string
          created_at?: string | null
          description?: string
          display_name?: string
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_image?: string | null
          primary_color?: string
          secondary_color?: string
          unlock_requirement?: string
          unlock_value?: number
        }
        Relationships: []
      }
      user_gamification: {
        Row: {
          created_at: string | null
          current_theme: string
          highest_score: number
          id: string
          level: number
          total_quizzes_taken: number
          total_study_time_minutes: number
          updated_at: string | null
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string | null
          current_theme?: string
          highest_score?: number
          id?: string
          level?: number
          total_quizzes_taken?: number
          total_study_time_minutes?: number
          updated_at?: string | null
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string | null
          current_theme?: string
          highest_score?: number
          id?: string
          level?: number
          total_quizzes_taken?: number
          total_study_time_minutes?: number
          updated_at?: string | null
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_unlocked_themes: {
        Row: {
          id: string
          theme_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          theme_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          theme_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_unlocked_themes_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_transactions: {
        Row: {
          created_at: string | null
          id: string
          source: string
          source_details: Json | null
          user_id: string
          xp_amount: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          source: string
          source_details?: Json | null
          user_id: string
          xp_amount: number
        }
        Update: {
          created_at?: string | null
          id?: string
          source?: string
          source_details?: Json | null
          user_id?: string
          xp_amount?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
