# Beginner: scale out based on CPU alarm.
# Advanced: autoscaling protects availability under burst traffic.

resource "aws_autoscaling_policy" "cpu_target" {
  name                   = "cpu-target-policy"
  autoscaling_group_name = "example-asg"
  policy_type            = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 60
  }
}
