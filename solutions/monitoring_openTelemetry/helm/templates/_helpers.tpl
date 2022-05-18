{{/*
Prepare ingress host, pass it as parameter.
*/}}
{{- define "ingress.application.host" -}}
{{- printf "application.%s"  .Values.ingress.host -}}
{{- end -}}

{{- define "ingress.jaeger.host" -}}
{{- printf "jaeger.%s"  .Values.ingress.host -}}
{{- end -}}

{{- define "ingress.grafana.host" -}}
{{- printf "grafana.%s"  .Values.ingress.host -}}
{{- end -}}
