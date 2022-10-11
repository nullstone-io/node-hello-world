//OpenTelemetry
import { Resource }  from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { trace } from "@opentelemetry/api";
//Exporter
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
//instrumentations
import { ExpressInstrumentation } from "opentelemetry-instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

//Exporter
export default function (appName, version, envName) {
    const exporter = new OTLPTraceExporter();
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: envName,
            [SemanticResourceAttributes.SERVICE_NAME]: appName,
            [SemanticResourceAttributes.SERVICE_VERSION]: version,
        }),
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    provider.register();
    registerInstrumentations({
        instrumentations: [
            new HttpInstrumentation(),
            new ExpressInstrumentation(),
        ],
        tracerProvider: provider,
    });
    return trace.getTracer(appName, version);
}
